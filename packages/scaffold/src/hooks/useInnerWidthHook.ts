import { useState, useEffect } from "react";

const useWindowInnerWidth = () => {
  const [windowInnerWidth, setWindowInnerWidth] = useState(840); // 기본값 설정

  useEffect(() => {
    // 클라이언트에서만 실행되도록 처리
    const handleResize = () => {
      const width = window.innerWidth >= 840 ? 840 : window.innerWidth;
      setWindowInnerWidth(width);
    };

    // 처음 렌더링 시 창 너비 설정
    handleResize();

    // 창 크기 변경 시 실행될 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowInnerWidth;
};

export default useWindowInnerWidth;
