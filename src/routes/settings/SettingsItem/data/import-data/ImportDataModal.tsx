import { useState } from 'react';
import { Data } from '../data.interfaces';
import classes from './ImportData.module.scss';
import { useLiveQuery } from 'dexie-react-hooks';
import { Activity, Category } from '../../../../../data/interfaces';
import { db } from '../../../../../data/Database';
import ModalPopup, {
    ButtonType,
} from '../../../../../components/generic/ModalPopup';
import { format } from 'date-fns';
import Checkbox from '../../../../../components/input/checkbox/Checkbox';
import { Database, Disc } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import { importData, mergeData } from '../data.functions';
import { AlertType } from '../../../../../components/generic/Alert';
import { IMPORT_SUCCESS, MERGE_SUCCESS } from '../data.data';

const cx = classNames.bind(classes);

interface ImportDataModalProps {
    data: Data;
    onClose: () => void;
    onAlertChange: (alert: AlertType) => void;
}

const ImportDataModal = ({
    data,
    onClose,
    onAlertChange,
}: ImportDataModalProps) => {
    const [shouldMerge, setShouldMerge] = useState<boolean>(false);

    const activities =
        useLiveQuery<Activity[]>(() => db.activities.toArray()) ?? [];
    const categories =
        useLiveQuery<Category[]>(() => db.categories.toArray()) ?? [];

    const isDbPopulated = activities.length > 0 || categories.length > 0;

    const primaryButtonText = isDbPopulated
        ? shouldMerge
            ? 'Merge'
            : 'Overwrite'
        : 'Import';

    const onButtonClick = (button: ButtonType) => {
        switch (button) {
            case 'primary':
                if (shouldMerge) {
                    mergeData(data);
                    onAlertChange(MERGE_SUCCESS);
                } else {
                    importData(data);
                    onAlertChange(IMPORT_SUCCESS);
                }
                onClose();
                break;
            case 'secondary':
            case 'close':
                onClose();
                break;
        }
    };

    return (
        <ModalPopup
            title="Import Data"
            primaryButtonText={primaryButtonText}
            secondaryButtonText="Cancel"
            onButtonClick={onButtonClick}
        >
            <div className={classes.content}>
                {isDbPopulated && (
                    <div className={classes.dataCard}>
                        <div className={classes.header}>
                            <div className={classes.title}>current data</div>
                        </div>
                        <div className={classes.content}>
                            <div className={classes.icon}>
                                <Database size={50} />
                            </div>
                            <div className={classes.property}>
                                <div className={classes.label}>activities</div>
                                <div className={classes.value}>
                                    {activities.length}
                                </div>
                            </div>
                            <div className={classes.property}>
                                <div className={classes.label}>categories</div>
                                <div className={classes.value}>
                                    {categories.length}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className={cx({ dataCard: true, iconLeft: true })}>
                    <div className={classes.header}>
                        <div className={classes.title}>Backup data</div>
                        <div className={classes.date}>
                            {format(data.lastModifiedDate!, 'dd/MM/yyyy')}
                        </div>
                    </div>
                    <div className={classes.content}>
                        <div className={classes.property}>
                            <div className={classes.label}>activities</div>
                            <div className={classes.value}>
                                {data.activities.length}
                            </div>
                        </div>
                        <div className={classes.property}>
                            <div className={classes.label}>categories</div>
                            <div className={classes.value}>
                                {data.categories.length}
                            </div>
                        </div>
                        <div className={classes.icon}>
                            <Disc size={50} />
                        </div>
                    </div>
                </div>
                {isDbPopulated && (
                    <>
                        <div className={classes.info}>
                            Remember to back up your data before proceeding, as
                            this action cannot be undone.
                        </div>
                        <div className={classes.mergeCheckbox}>
                            <Checkbox
                                checked={shouldMerge}
                                onChange={() => setShouldMerge((prev) => !prev)}
                                label="Merge with existing data"
                            />
                        </div>
                    </>
                )}
            </div>
        </ModalPopup>
    );
};

export default ImportDataModal;
