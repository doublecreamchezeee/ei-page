import React, { useEffect, useState } from "react";
import styles from "./University.module.css";

const ImageSlider = () => {
  const images = [
    "/logo1.png",
    "/logo2.jpg",
    "/logo3.png",
    "/logo4.jpg",
    "/logo5.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={styles.slider}>
      <div
        className={styles.sliderWrapper}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`, // Move left based on current index
          transition: 'transform 0.5s ease-in-out', // Smooth transition effect
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className={styles.sliderImage}
          />
        ))}
      </div>
    </div>
  );
};

const University = () => {
  return (
    <div className={styles.rows}>
      <div className={styles.row1}>
        <div className={styles.col1}>
          <div>
            <h2>
              Hơn 5000 đối tác giáo dục hàng đầu & trên 200 văn phòng đại diện
              toàn quốc.
            </h2>
            <div className={styles.col2}>
              <div>
                {/* Auto-advancing image slider */}
                <ImageSlider />
              </div>

              <h2 style={{marginBottom: 10, marginTop: 30}}>Quy trình 6 bước </h2>
            </div>
            {/* <h3>QUY TRÌNH 6 BƯỚC</h3> */}
            <div className={styles.searchUni}>
              <p>
                Học viên trực tiếp đăng ký tham gia Du học nghề Đức tại văn
                phòng EI GROUP, hoặc liên hệ hotline, email bên dưới để được
                hướng dẫn cụ thể.
                <br />
                <br />
                1. Học Tiếng Đức từ trình độ A1-B1 từ 6-8 tháng tại Học viện EI
                ACADEMY trực thuộc EI GROUP (có ký túc xá nội trú cho học viên).
                <br />
                <br />
                2. Học tập định hướng cơ bản: Tìm hiểu văn hóa, phong tục, luật
                pháp của CHLB Đức và các thông tin cơ bản, cần thiết trước khi
                sang Đức từ 1-2 tháng.
                <br />
                <br />
                3. Làm các thủ tục xin Visa từ 1-2 tháng (làm song song trong
                thời gian học tiếng Đức và học tập định hướng).
                <br />
                <br />
                4. Làm các thủ tục xuất cảnh và nhập học tại CHLB Đức.
                <br />
                <br />
                5. Kết thúc khóa học, học viên được nhận bằng cấp quốc tế, đồng
                thời ký hợp đồng làm việc chính thức.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row2}>
        <div className={`${styles.item} ${styles.item1}`}>
          <h5 className={styles.overlayTitle}>HỒ SƠ THAM GIA</h5>
          <ul className={styles.documentList}>
            <li className={styles.documentItem}>
              <strong>1.</strong> Sơ yếu lý lịch (Ghi rõ thời gian từ khi học
              cấp 1 đến nay làm gì, ở đâu)
            </li>
            <li className={styles.documentItem}>
              <strong>2.</strong> CMND công chứng, Giấy khai sinh bản sao
            </li>
            <li className={styles.documentItem}>
              <strong>3.</strong> Chứng nhận sức khỏe đi lao động và du học
            </li>
            <li className={styles.documentItem}>
              <strong>4.</strong> Bằng THPT, học bạ THPT, bằng tốt nghiệp và
              bảng điểm trung cấp, CĐ hoặc ĐH (nếu có)
            </li>
            <li className={styles.documentItem}>
              <strong>5.</strong> Chứng chỉ tiếng Đức A2-B1-B2 (Nếu có)
            </li>
            <li className={styles.documentItem}>
              <strong>6.</strong> Hộ chiếu còn giá trị sử dụng trên 12 tháng
            </li>
            <li className={styles.documentItem}>
              <strong>7.</strong> Giấy đăng ký kết hôn (nếu có)
            </li>
            <li className={styles.documentItem}>
              <strong>8.</strong> Lý lịch tư pháp làm tại Sở Tư pháp tỉnh, thành
              phố nơi cư trú
            </li>
            <li className={styles.documentItem}>
              <strong>9.</strong> Ảnh chụp: 12 ảnh 3×4; 12 Ảnh hộ chiếu 3.5 x
              4,5.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default University;
