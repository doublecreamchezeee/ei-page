import React from "react";
import { useHistory } from "react-router-dom";
import { useCountries } from "../api/countriesApi";
import LoadingSpinner from "../shared/components/UI-Elements/LoadingSpinner";

import Team from "../assets/images/Team.svg";
import Handshake from "../assets/images/Handshake.svg";
import Mortarboard from "../assets/images/Mortarboard.svg";

import styles from "./Countries.module.css";

const Countries = () => {
  let content;

  content = (
    <div className={styles.bgSec}>
      <div className={styles.content}>
        <div className={styles.contentInfo}>
          <h2 className={styles.titles}>Shoot For the Stars</h2>
          <div className={styles.video}>
            <iframe
              title="europe-info"
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/QdZB-bXiUkQ"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <h2 className={styles.titles}>
            Cử nhân/Thạc sĩ
            <br /> Chương trình tại châu âu
          </h2>
        </div>
      </div>
      <div class="countriesSection">
        <h2 class="sectionTitle">Các Ngành Nghề Du Học</h2>

        <div class="course">
          {/* <div class="courseImage">
            <img
              src="/public/nurse.jpg"
              alt="Ngành Điều Dưỡng"
              class="courseIllustration"
            />
          </div> */}
          <div class="courseContent">
            <h3 class="courseTitle">Ngành Điều Dưỡng</h3>
            <ul class="courseDetails">
              <li>Độ tuổi: 18-35 tuổi</li>
              <li>Tốt nghiệp THPT trở lên</li>
              <li>
                Chứng chỉ: Nền Điều dưỡng (sẽ được đào tạo khi học tiếng Đức)
              </li>
              <li>Sức khỏe tốt, không mắc các bệnh truyền nhiễm</li>
              <li>Trình độ tiếng Đức: Chứng chỉ B1 hoặc B2</li>
              <li>Chỉ tiêu tuyển sinh: 500 học viên</li>
              <li>Hệ đào tạo: 3 năm</li>
            </ul>
          </div>
        </div>

        <div class="course">
          <h3 class="courseTitle">Ngành Cơ Khí</h3>
          <ul class="courseDetails">
            <li>Độ tuổi: 18-35 tuổi</li>
            <li>Tốt nghiệp THPT trở lên</li>
            <li>Sức khỏe tốt, không mắc các bệnh truyền nhiễm</li>
            <li>Chỉ tiêu tuyển sinh: 500 học viên</li>
            <li>Hệ đào tạo: 3 năm</li>
          </ul>
        </div>

        <div class="course">
          <h3 class="courseTitle">Ngành Xây Dựng</h3>
          <ul class="courseDetails">
            <li>Độ tuổi: 18-35 tuổi</li>
            <li>Tốt nghiệp THPT trở lên</li>
            <li>Sức khỏe tốt, không mắc các bệnh truyền nhiễm</li>
            <li>Chỉ tiêu tuyển sinh: 450 học viên</li>
            <li>Hệ đào tạo: 3 năm</li>
          </ul>
        </div>

        <div class="course">
          <h3 class="courseTitle">Ngành Nhà Hàng, Khách Sạn</h3>
          <ul class="courseDetails">
            <li>Độ tuổi: 18-35 tuổi</li>
            <li>Tốt nghiệp THPT trở lên</li>
            <li>Sức khỏe tốt, không mắc các bệnh truyền nhiễm</li>
            <li>Chỉ tiêu tuyển sinh: 620 học viên</li>
            <li>Hệ đào tạo: 3 năm</li>
          </ul>
        </div>

        <div class="course">
          <h3 class="courseTitle">Ngành Công Nghệ Thông Tin</h3>
          <ul class="courseDetails">
            <li>Độ tuổi: 18-35 tuổi</li>
            <li>Tốt nghiệp THPT trở lên</li>
            <li>Sức khỏe tốt, không mắc các bệnh truyền nhiễm</li>
            <li>Chỉ tiêu tuyển sinh: 300 học viên</li>
            <li>Hệ đào tạo: 3 năm</li>
          </ul>
        </div>

        <div class="course">
          <h3 class="courseTitle">Chuyển Đổi Bằng Điều Dưỡng</h3>
          <ul class="courseDetails">
            <li>
              Đối tượng: Sinh viên đang học hoặc tốt nghiệp ngành Điều dưỡng
            </li>
            <li>Cơ hội làm việc tại Đức với mức lương từ 2.000 Euro/tháng</li>
            <li>Hệ đào tạo: 1 năm</li>
            <li>Chỉ tiêu tuyển sinh: 1.000 học viên</li>
          </ul>
        </div>

        <div class="course">
          <h3 class="courseTitle">Chuyển Đổi Bằng CNTT</h3>
          <ul class="courseDetails">
            <li>Đối tượng: Sinh viên đang học hoặc tốt nghiệp ngành CNTT</li>
            <li>Cơ hội làm việc với mức lương từ 1.100 Euro/tháng</li>
            <li>Hệ đào tạo: 1 năm</li>
          </ul>
        </div>

        <div class="course">
          <h3 class="courseTitle">Chuyển Đổi Bằng Cơ Khí</h3>
          <ul class="courseDetails">
            <li>Đối tượng: Sinh viên ngành Cơ khí</li>
            <li>Cơ hội làm việc với mức lương từ 2.100 Euro/tháng</li>
            <li>Hệ đào tạo: 1 năm</li>
          </ul>
        </div>
      </div>

      <footer className={styles.foot}>
        <div className={styles.icon}>
          <img src={Team} width="40" alt="footer" />
          <label className={styles.label}>Tư vấn viên cá nhân</label>
        </div>
        <div className={styles.icon}>
          <img src={Handshake} width="40" alt="footer" />
          <label className={styles.label}>Đảm bảo giá tốt nhất</label>
        </div>
        <div className={styles.icon}>
          <img src={Mortarboard} width="40" alt="footer" />
          <label className={styles.label}>Hơn 5 năm kinh nghiệm</label>
        </div>
      </footer>
    </div>
  );

  return content;
};

export default Countries;
