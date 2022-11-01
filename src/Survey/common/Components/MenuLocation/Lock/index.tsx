import { FC, useRef } from 'react';
import { observer } from 'mobx-react';
import {
  IonLabel,
  IonIcon,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  isPlatform,
} from '@ionic/react';
import Sample from 'models/sample';
import appModel from 'models/app';
import { useToast } from '@flumens';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import {
  lockOpenOutline,
  lockClosedOutline,
  chevronForwardOutline,
} from 'ionicons/icons';
import clsx from 'clsx';
import MenuLocation from '..';
import './styles.scss';

export interface Props {
  sample: Sample;
  skipLocks?: boolean;
  label?: string;
}

const Lock: FC<Props> = ({ sample, skipLocks, label }) => {
  const sliderRef = useRef<any>();
  const toast = useToast();

  const isLocationLocked = appModel.isAttrLocked(sample, 'location');
  const isLocationNameLocked = appModel.isAttrLocked(sample, 'locationName');
  const isAnyLocked = isLocationLocked || isLocationNameLocked;

  const { location } = sample.attrs;
  // don't lock GPS because it varies more than a map or gridref
  const canLockLocation = location?.source !== 'gps' && !!location?.latitude;
  const canLockName = !!location?.name;

  const toggleLocationLockWrap = () => {
    sliderRef.current.close();

    isPlatform('hybrid') && Haptics.impact({ style: ImpactStyle.Light });

    const isLocked = appModel.getAttrLock(sample, 'location');
    if (isLocked) {
      appModel.unsetAttrLock(sample, 'location');
      return;
    }

    if (!canLockLocation) return;

    const clonedLocation = JSON.parse(JSON.stringify(location));

    // remove location name as it is locked separately
    delete clonedLocation.name;

    toast.success(
      'The attribute value was locked and will be pre-filled for subsequent records.',
      {
        color: 'secondary',
        position: 'bottom',
      }
    );

    appModel.setAttrLock(sample, 'location', clonedLocation);
  };

  const toggleNameLockWrap = () => {
    sliderRef.current.close();

    isPlatform('hybrid') && Haptics.impact({ style: ImpactStyle.Light });

    if (isLocationNameLocked) {
      appModel.unsetAttrLock(sample, 'locationName');
      return;
    }

    const name = sample.attrs.location?.name;
    if (!name) return;

    toast.success(
      'The attribute value was locked and will be pre-filled for subsequent records.',
      {
        color: 'secondary',
        position: 'bottom',
      }
    );

    appModel.setAttrLock(sample, 'locationName', name);
  };

  const isDisabled = sample.isDisabled();

  const allowLocking = !skipLocks && (canLockName || canLockLocation);

  return (
    <IonItemSliding
      ref={sliderRef}
      disabled={isDisabled || !allowLocking}
      className="menu-attr-item-location-with-lock"
    >
      <MenuLocation
        sample={sample}
        detailIcon={isAnyLocked ? lockClosedOutline : chevronForwardOutline}
        className={clsx(
          { locked: isAnyLocked },
          isLocationNameLocked && 'location-name-value-locked',
          isLocationLocked && 'location-value-locked'
        )}
        label={label}
      />

      <IonItemOptions side="end">
        {canLockLocation && (
          <IonItemOption
            className={clsx('lock', isLocationLocked && 'locked')}
            color="secondary"
            onClick={toggleLocationLockWrap}
          >
            <div className="label-wrap">
              <IonIcon
                icon={isLocationLocked ? lockOpenOutline : lockClosedOutline}
              />
              <IonLabel>Location</IonLabel>
            </div>
          </IonItemOption>
        )}

        {canLockName && (
          <IonItemOption
            className={clsx('lock', isLocationNameLocked && 'locked')}
            color="secondary"
            onClick={toggleNameLockWrap}
          >
            <div className="label-wrap">
              <IonIcon
                icon={
                  isLocationNameLocked ? lockOpenOutline : lockClosedOutline
                }
              />
              <IonLabel>Name</IonLabel>
            </div>
          </IonItemOption>
        )}
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default observer(Lock);
