import { FC, useEffect, useContext } from 'react';
import { useAlert } from '@flumens';
import appModel from 'models/app';
import savedSamples from 'models/savedSamples';
import Occurrence from 'models/occurrence';
import { observer } from 'mobx-react';
import { Trans as T, useTranslation } from 'react-i18next';
import { NavContext, IonItem, IonCheckbox, IonLabel } from '@ionic/react';
import VerificationIcon from 'common/Components/VerificationStatus/VerificationIcon';
import './styles.scss';

let isPopupVisible = false;

const UpdatedRecordsDialog: FC = () => {
  const alert = useAlert();
  const { t } = useTranslation();
  const { navigate } = useContext(NavContext);

  const { showVerifiedRecordsNotification } = appModel.attrs;

  const onToggleAlert = (e: any) => {
    // eslint-disable-next-line no-param-reassign
    appModel.attrs.showVerifiedRecordsNotification = !e.detail.checked;
  };

  const showAlert = () => {
    if (!showVerifiedRecordsNotification || isPopupVisible) return;

    const updatedOccurrences = savedSamples.verified.updated;
    if (!updatedOccurrences?.length) return;

    isPopupVisible = true;

    const isStatus = (status: string) => (occ: Occurrence) =>
      occ.getVerificationStatus() === status;

    const verified = updatedOccurrences.filter(isStatus('verified')).length;
    const plausible = updatedOccurrences.filter(isStatus('plausible')).length;
    const rejected = updatedOccurrences.filter(isStatus('rejected')).length;

    const message = (
      <>
        <p>
          <T>
            Some of your records have been verified. You can find those in your{' '}
            <b>Uploaded</b> records list.
          </T>
        </p>

        <div className="counts">
          {!!verified && (
            <div className="verified-count">
              <VerificationIcon status="verified" />
              <span>
                <T>Accepted</T>:
              </span>
              <b>{verified}</b>
            </div>
          )}
          {!!plausible && (
            <div className="verified-count">
              <VerificationIcon status="plausible" />
              <span>
                <T>Plausible</T>:
              </span>
              <b>{plausible}</b>
            </div>
          )}
          {!!rejected && (
            <div className="verified-count">
              <VerificationIcon status="rejected" />
              <span>
                <T>Rejected</T>:
              </span>
              <b>{rejected}</b>
            </div>
          )}
        </div>

        <IonItem lines="none">
          <IonCheckbox
            slot="start"
            checked={false}
            onIonChange={onToggleAlert}
          />
          <IonLabel>
            <small>
              <T>Do not show again</T>
            </small>
          </IonLabel>
        </IonItem>
      </>
    );

    alert({
      header: `${t('New verified records')} (${updatedOccurrences.length})`,
      message,
      cssClass: 'updated-records-dialog',
      backdropDismiss: false,
      skipTranslation: true,
      buttons: [
        {
          text: t('Close'),
          handler: () => {
            isPopupVisible = false;
            appModel.save();
          },
        },
        {
          text: t('See records'),
          handler: () => {
            isPopupVisible = false;
            appModel.save();
            navigate('/home/surveys/uploaded', 'root');
          },
        },
      ],
    });
  };

  useEffect(showAlert, [savedSamples.verified?.timestamp]);

  return null;
};

export default observer(UpdatedRecordsDialog);
