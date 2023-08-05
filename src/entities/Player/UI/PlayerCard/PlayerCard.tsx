import React, { useEffect, useRef } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PlayerCard.module.scss';
import Preloader from 'shared/UI/Preloader/Preloader';
import Text, { TextAlign, TextTheme } from 'shared/UI/Text/Text';
import { PlayerData } from 'entities/Player/types/player';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useSelector } from 'react-redux';
import {
  getPlayerDataError,
  getPlayerPoints,
  getPlayerProfile,
} from 'entities/Player/model/selectors/getPlayerData';
import { getGoogleProfile } from 'features/AuthWithGoogle';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { requestHabits } from 'entities/Player/model/services/requestHabits';
import Notification from 'shared/UI/Notification/Notification';
import { setShowCompleted } from 'entities/TaskTracker/model/slice/TaskTrackerSlice';
import { getShowCompleted } from 'entities/TaskTracker/model/selectors/getTaskTrackerData';

interface PlayerCardProps {
  className?: string;
  PlayerData?: PlayerData;
  isLoading?: boolean;
  error?: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  className,
  isLoading,
  error,
}) => {
  const account = useSelector(getGoogleProfile);
  const player = useSelector(getPlayerProfile);
  const points = useSelector(getPlayerPoints);
  const APIerror = useSelector(getPlayerDataError);
  const completed = useSelector(getShowCompleted);
  const dispatch = useAppDispatch();

  // const notificationRef = useRef(null);   <Notification ref={notificationRef} />

  // useEffect(() => {
  //   //@ts-ignore
  //   notificationRef.current.show();
  // }, [points, APIerror]);

  if (isLoading) {
    return (
      <div
        className={classNames(cls.PlayerCard, { [cls.isLoading]: true }, [
          className,
        ])}
      >
        <Preloader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(cls.PlayerCard, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          title={'some error ocuured'}
          text="try 2 refresh the page"
          align={TextAlign.Center}
        />
      </div>
    );
  }

  const onShowCompleted = () => {
    dispatch(setShowCompleted(!completed));
  };

  return (
    <div className={classNames(cls.PlayerCard, {}, [className])}>
      <div className={cls.accWrapper}>
        <div className={cls.user}>
          <div className={cls.pic}>
            {account?.photoURL ? (
              <img src={account.photoURL} alt="User Avatar" />
            ) : null}
          </div>
          <div className={cls.userBottom}>
            <div className={cls.name}>{account?.displayName}</div>
            <div className={cls.coins}>{player.coins + ' INS'}</div>
          </div>
        </div>
        <div className={cls.indicators}>
          <div className={cls.health}>
            <span>Health</span>
            <span>{player.health}</span>
          </div>
          <div className={cls.level}>
            {' '}
            <span>Level</span>
            <span>{player.level}</span>{' '}
          </div>
          <div className={cls.points}>
            <span>Points</span>
            <span>{player.points}</span>
          </div>
          <div className={cls.buttnz}>
            <Button theme={ButtonTheme.OUTLINE}>Habits</Button>
            <Button theme={ButtonTheme.OUTLINE}>Tasks</Button>
            <Button theme={ButtonTheme.OUTLINE}>Daily</Button>
            <Button
              theme={
                completed ? ButtonTheme.OUTLINE_GREEN : ButtonTheme.OUTLINE
              }
              onClick={onShowCompleted}
            >
              Completed
            </Button>
          </div>
        </div>
        <div className={cls.tags}>
          <div className={cls.header}>Tags</div>
        </div>
      </div>{' '}
    </div>
  );
};

export default PlayerCard;