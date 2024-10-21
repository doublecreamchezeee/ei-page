import React from "react";

import Slider from "../shared/components/UI-Elements/Slider";
import Button from "../shared/components/Form-Elements/Button";
import SidePicture from "../assets/images/BG.jpg";

import styles from "./Landing.module.css";
const Landing = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.innerContent}>
          <div>
            <h1 className={styles.cto}>
              <div className={styles.highlight}>Giới thiệu</div>
              <br />
              <span className={styles.color}>EI Group</span>
            </h1>
            <p>
            Tập đoàn Giáo dục và Đầu tư EI (EI GROUP) là đơn vị tiên phong 
            trong lĩnh vực đào tạo ngoại ngữ, du học nghề CHLB Đức. 
            Với uy tín về chất lượng đào tạo, nhiều chính sách ưu đãi 
            dành cho học viên, EI GROUP đã trở thành địa chỉ tin cậy của 
            phụ huynh, học sinh trên cả nước. 
            Trong suốt những năm vừa qua, EI GROUP luôn nỗ lực không ngừng
             để giúp các bạn trẻ Việt Nam tiếp cận với chương trình Du học nghề CHLB Đức, 
             giúp các bạn tìm được hướng đi tốt nhất với mức thu nhập cao, thay đổi cuộc sống ở 
             Top 4 nền kinh tế lớn nhất thế giới.
            </p>
            <div className={styles.actions}>
              <Button large to="/contact">
                Tư vấn ngay
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.sidePic}>
          <img src={SidePicture} alt="homepage" />
        </div>
      </div>
      <div className={styles.slider}>
        <Slider />
      </div>
    </div>
  );
};

export default Landing;
