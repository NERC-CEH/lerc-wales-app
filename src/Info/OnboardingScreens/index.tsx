import { useState } from 'react';
import { observer } from 'mobx-react';
import { arrowForward, checkmarkOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Page, Main } from '@flumens';
import {
  IonButton,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonFooter,
} from '@ionic/react';
import appModel from 'models/app';
import welcomeBackground1 from './images/welcome_1.jpg';
import './styles.scss';

type Props = {
  children: any;
};

const OnBoardingScreens = ({ children }: Props) => {
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
              <h2>
                <T>Welcome</T>
              </h2>
              <p>
                <T>
                  <b>LERC Wales</b> helps you with management and sharing of
                  your wildlife observations
                </T>
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
