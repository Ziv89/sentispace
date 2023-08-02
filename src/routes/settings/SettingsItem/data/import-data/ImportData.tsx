import classes from './ImportData.module.scss';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { CircleNotch } from '@phosphor-icons/react';
import ImportDataModal from './ImportDataModal';
import { Data } from '../data.interfaces';
import { AlertType } from '../../../../../components/generic/Alert';
import SettingsItem from '../../SettingsItem';
import { isValidData } from '../data.functions';
import {
    IMPORT_FAIL_PARSE,
    IMPORT_INVALID,
    IMPORT_NO_FILE,
    IMPORT_WRONG_FORMAT,
} from '../data.data';

type loadingState = {
    isLoading: boolean;
    loadingMessage: string | null;
};

const ImportData = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [loadedData, setLoadedData] = useState<Data | null>(null);
    const [loadingState, setLoadingState] = useState<loadingState>({
        isLoading: false,
        loadingMessage: null,
    });
    const [alert, setAlert] = useState<AlertType | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!alert) return;

        disableLoadingState();
        setLoadedData(null);
    }, [alert]);

    useEffect(() => {
        if (isModalOpen) return;

        disableLoadingState();
        setLoadedData(null);
    }, [isModalOpen]);

    const handleFileChange = async (
        event: ChangeEvent<HTMLInputElement>
    ): Promise<void> => {
        if (loadedData) setLoadedData(null);

        const file = event.target.files?.[0];

        if (!file) {
            setAlert(IMPORT_NO_FILE);
            return;
        }

        setLoadingState({ isLoading: true, loadingMessage: 'Loading backup' });

        if (file.type !== 'application/json') {
            setAlert(IMPORT_WRONG_FORMAT);
            return;
        }

        setLoadingState({ isLoading: true, loadingMessage: 'Parsing backup' });

        const fileContent = await file.text();

        let data: Data;

        try {
            data = JSON.parse(fileContent);
        } catch (error) {
            setAlert(IMPORT_FAIL_PARSE);
            return;
        }

        setLoadingState({ isLoading: true, loadingMessage: 'Validating data' });

        if (!isValidData(data)) {
            setAlert(IMPORT_INVALID);
            return;
        }

        data.lastModifiedDate = new Date(file.lastModified);

        disableLoadingState();
        setLoadedData(data);
        setIsModalOpen(true);
    };

    const disableLoadingState = () =>
        setLoadingState({ isLoading: false, loadingMessage: null });

    const handleOnClick = async () => {
        if (!inputRef.current) return;

        inputRef.current.click();
    };

    return (
        <SettingsItem
            label="Import data"
            iconKey="ArrowSquareIn"
            onClick={handleOnClick}
            alert={alert}
            onAlertRemove={() => setAlert(null)}
        >
            <input
                className={classes.fileUpload}
                type="file"
                accept=".json"
                ref={inputRef}
                onChange={handleFileChange}
            />
            {loadingState.isLoading && (
                <>
                    {loadingState.loadingMessage}
                    <CircleNotch
                        size={24}
                        color="var(--color-neutral-3)"
                        className={classes.loadingIcon}
                    />
                </>
            )}

            {isModalOpen && loadedData && (
                <ImportDataModal
                    data={loadedData}
                    onClose={() => setIsModalOpen(false)}
                    onAlertChange={setAlert}
                />
            )}
        </SettingsItem>
    );
};

export default ImportData;
