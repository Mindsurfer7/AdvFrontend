import React, { useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SingleGroupPage.module.scss';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  getCommunityData,
  getSinglePublicData,
  requestCommunityByID,
} from 'entities/Community';
import Text, { TextAlign, TextSize } from 'shared/UI/Text/Text';
import Textarea from 'shared/UI/Textarea/Textarea';
import Input from 'shared/UI/Input/Input';
import { ChallengeCreatorModal } from 'entities/Challenge/UI/Modal/ChallengeCreatorModal';
import { getchallenges } from 'entities/Challenge/model/selectors/getChallengeData';
import { ChallengeCard } from 'entities/Challenge';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { requestChallenges } from 'entities/Challenge/model/services/requestChallenges';
import { becomeCommunityMember } from 'entities/Community/model/services/becomeCommunityMember';
import {
  getGoogleID,
  getGoogleIsLogged,
  getGoogleProfile,
} from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { useTranslation } from 'react-i18next';
import { Wall } from 'entities/Wall';
import { WebChat } from 'entities/Chat';
import { Page } from 'widgets/Page';
import { requestChallengesByPublicID } from '../model/services/requestChallengesByPublicID';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { singleGroupPageReducer } from '../model/slice/singleGroupPageSlice';
import {
  getSingleGroupPageArticles,
  getSingleGroupPageIsLoading,
  getSingleGroupPagePosts,
} from '../model/selectors/getSingleGroupPageData';
import { publishPostInPublic } from '../model/services/publishPostInPublic';
import { requestPostsByPublicID } from '../model/services/requestPostsByPublicID';
import { ArticlesList } from 'entities/Article';
import { requestArticlesByPublicID } from '../model/services/requestArticlesByPublicID';

interface SingleGroupPageProps {
  className?: string;
}

const reducers: ReducersList = {
  SingleGroupPage: singleGroupPageReducer,
};

const SingleGroupPage: React.FC<SingleGroupPageProps> = ({ className }) => {
  const community = useSelector(getSinglePublicData);
  const GoogleProfile = useSelector(getGoogleProfile);
  const challengesData = useSelector(getchallenges);
  const userID = useSelector(getGoogleID);
  const { publicID } = useParams();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('SingleGroupPage');
  const [isVisible, setVisibility] = useState(false);
  const isLoading = useSelector(getSingleGroupPageIsLoading);
  const isLogged = useSelector(getGoogleIsLogged);
  const posts = useSelector(getSingleGroupPagePosts);
  const articles = useSelector(getSingleGroupPageArticles);

  const challenges = challengesData.filter(
    (chal) => chal.communityID === publicID,
  );

  const isMember = community?.members.find((x) => x === userID);

  useEffect(() => {
    publicID && dispatch(requestCommunityByID(publicID));
    publicID && dispatch(requestPostsByPublicID(publicID));
    publicID && dispatch(requestArticlesByPublicID(publicID));
    publicID && dispatch(requestChallengesByPublicID(publicID));
  }, [dispatch, publicID]);

  const onCloseModal = useCallback(() => {
    setVisibility(false);
  }, []);
  const onOpenModal = useCallback(() => {
    setVisibility(true);
  }, []);

  const onRequestChallenges = () => {
    dispatch(requestChallenges());
  };
  const onBecomeMember = () => {
    publicID && dispatch(becomeCommunityMember(publicID));
  };

  const onCreatePost = useCallback(() => {
    if (!isLogged) {
      alert('Log in');
    }
    if (publicID) {
      dispatch(publishPostInPublic(publicID));
    }
  }, [dispatch, isLogged, publicID]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page
        className={classNames(cls.SingleGroupPage, {}, [className as string])}
      >
        {isVisible && publicID && (
          <ChallengeCreatorModal
            communityID={publicID}
            requestCallback={onRequestChallenges}
            onClose={onCloseModal}
            isVisible={isVisible}
          />
        )}
        <div className={cls.PublicWrapper}>
          <div className={cls.groupAbout}>
            <div className={cls.x}>
              <img src={community?.posterLink} className={cls.pic} />
              <Text title={community?.title} align={TextAlign.Center} />
              {isMember ? (
                <Button theme={ButtonTheme.OUTLINE_GREEN}>
                  {t('youAreMember')}
                </Button>
              ) : (
                <Button theme={ButtonTheme.OUTLINE} onClick={onBecomeMember}>
                  {t('becomeMember')}
                </Button>
              )}
              <Text title={community?.description} />
            </div>
          </div>

          <WebChat
            publicID={publicID}
            chatName={community?.title ? community?.title : 'Club Chat'}
          />
        </div>
        <div className={cls.articles}>
          <Text title="Статьи паблика" align={TextAlign.Center} />
          <ArticlesList
            //@ts-ignore
            articles={articles}
            className={cls.list}
          />
        </div>

        <Wall
          posts={posts}
          className={cls.Wall}
          onCreatePost={onCreatePost}
          renderData={community}
        />

        <div className={cls.challenges}>
          <Text title={t('communityChallenges')} align={TextAlign.Center} />
          <Button
            theme={ButtonTheme.OUTLINE}
            className={cls.newChallBtn}
            onClick={onOpenModal}
          >
            {t('newChallenge')}
          </Button>

          <div className={cls.chalArray}>
            {challenges?.map((chal) => {
              console.log(chal);

              return (
                <ChallengeCard
                  startDate={chal.startDate!} //УБАРТЬ ВОСКЛ ЗНАКИ!!!!!!!!!!!!!!!!!!!!!!!!!1
                  endDate={chal.endDate!}
                  participants={chal.participants}
                  title={chal.title}
                  //@ts-ignore если поставить большими буквами будет тот айди что в4
                  id={chal.id}
                  description={chal.description}
                />
              );
            })}
          </div>
        </div>
      </Page>
    </DynamicModuleLoader>
  );
};

export default SingleGroupPage;
