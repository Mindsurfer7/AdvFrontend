import React, { useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ChallengesList.module.scss';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { getChallengesByUserID } from 'entities/Challenge/model/services/getChellengesByUserID';
import { useSelector } from 'react-redux';
import {
  getChallengesIsLoading,
  getchallenges,
} from 'entities/Challenge/model/selectors/getChallengeData';
import PersonalChallengeDashboard from '../PersonalChallengeDashboard/PersonalChallengeDashboard';
import Preloader from 'shared/UI/Preloader/Preloader';

interface ChallengesListProps {
  className?: string;
  //userID: string;
}

const ChallengesList: React.FC<ChallengesListProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const challenges = useSelector(getchallenges);
  const isLoading = useSelector(getChallengesIsLoading);
  const [showDashboard, setShowDashboard] = useState(false);
  const [dashboardID, setDashboardID] = useState('');

  useEffect(() => {
    dispatch(getChallengesByUserID());
  }, [dispatch]);

  const onShowDashboard = (id: string) => {
    setDashboardID(id);
    setShowDashboard(true);
  };
  const onHideDashboard = () => {
    setShowDashboard(false);
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className={classNames(cls.ChallengesList, {}, [className as string])}>
      {showDashboard && (
        <span onClick={onHideDashboard}>{' < back to list'}</span>
      )}
      {showDashboard ? (
        <PersonalChallengeDashboard ID={dashboardID} challenges={challenges} />
      ) : (
        <div className={cls.listWrapper}>
          {challenges.map((c) => {
            return (
              <div //@ts-ignore
                onClick={() => onShowDashboard(c.id)}
                className={cls.chalTitle}
              >
                {c.title}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChallengesList;
