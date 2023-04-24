import { FC, useState } from 'react';
import appModel from 'models/app';
import { Page, Main } from '@flumens';
import { observer } from 'mobx-react';
import {
  IonButton,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonFooter,
} from '@ionic/react';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { arrowForward, checkmarkOutline } from 'ionicons/icons';
import './styles.scss';
import welcomeBackground1 from './images/welcome_1.jpg';
import './images/welcome_2.jpg';
import './images/welcome_3.jpg';
import './images/welcome_4.jpg';

const OnBoardingScreens: FC = ({ children }) => {
  const [moreSlidesExist, setMoreSlidesExist] = useState(false);
  const [controlledSwiper, setControlledSwiper] = useState<SwiperCore>();

  const { showWelcome } = appModel.attrs;
  if (!showWelcome) {
    return <>{children}</>; // eslint-disable-line react/jsx-no-useless-fragment
  }

  function exit() {
    // eslint-disable-next-line no-param-reassign
    appModel.attrs.showWelcome = false;
    appModel.save();
  }

  const handleSlideChangeStart = async () => {
    const isEnd = controlledSwiper && controlledSwiper.isEnd;
    setMoreSlidesExist(!isEnd);
  };

  const slideNextOrClose = () => {
    if (moreSlidesExist) {
      controlledSwiper && controlledSwiper.slideNext();
      return;
    }

    exit();
  };

  return (
    <Page id="welcome-page">
      <Main>
        <Swiper
          onSwiper={setControlledSwiper}
          modules={[Pagination]}
          pagination={moreSlidesExist}
          onSlideChange={handleSlideChangeStart}
        >
          <SwiperSlide
            className="first"
            style={{ backgroundImage: `url(${welcomeBackground1})` }}
          >
            <div className="message">
              <h2>Welcome</h2>
              <p>
                <b>LERC Wales</b> helps you with management and sharing of your
                wildlife observations
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </Main>

      <IonFooter className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton
              onClick={slideNextOrClose}
              color="primary"
              fill="solid"
              shape="round"
            >
              <IonIcon
                icon={!moreSlidesExist ? checkmarkOutline : arrowForward}
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </Page>
  );
};

export default observer(OnBoardingScreens);
