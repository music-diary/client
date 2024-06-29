import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import Colors from '@/constants/Colors';

interface VerifyTimerProps {
  retry: boolean;
  setRetry: React.Dispatch<React.SetStateAction<boolean>>;
}

const VerifyTimer = ({ retry, setRetry }: VerifyTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(180);
  const [timerRunning, setTimerRunning] = useState(true); // 타이머가 실행 중인지 여부

  useEffect(() => {
    if (timerRunning) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            clearInterval(timer);
            setTimerRunning(false); // 타이머 종료 후 실행 상태를 false로 설정
            return 0; // 시간이 0 이하로 가지 않도록 보장
          }
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timerRunning]);

  useEffect(() => {
    if (retry) {
      startTimer();
    }
  }, [retry]);

  const startTimer = () => {
    setTimeLeft(180); // 시간 초기화
    setTimerRunning(true); // 타이머 실행 상태를 true로 설정
    setRetry(false); // 재시도 상태를 false로 설정
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return <Text style={styles.verifyTimer}>{formatTime(timeLeft)}</Text>;
};

export default VerifyTimer;

const styles = StyleSheet.create({
  verifyTimer: {
    color: Colors.PINK,
  },
});
