import { AlertType } from '../../../../components/generic/Alert';

export const DELETE_GUARD: AlertType = {
    severity: 'warning',
    title: 'Attention!',
    description:
        'This action is irreversible. Press again within the next 5 seconds to confirm deletion of the database.',
};

export const DELETE_SUCCESS: AlertType = {
    severity: 'success',
    title: 'Success!',
    description: 'The database was deleted successfully.',
};

export const IMPORT_NO_FILE: AlertType = {
    severity: 'error',
    title: 'File Not Selected',
    description: 'Please select a file before importing.',
};

export const IMPORT_WRONG_FORMAT: AlertType = {
    severity: 'error',
    title: 'Invalid File Format',
    description: 'The selected file must be in JSON format.',
};

export const IMPORT_FAIL_PARSE: AlertType = {
    severity: 'error',
    title: 'Backup File Corrupted',
    description: 'There was an error while parsing the JSON data.',
};

export const IMPORT_INVALID: AlertType = {
    severity: 'error',
    title: 'Corrupted Backup Data',
    description: 'The imported data did not pass validation checks.',
};

export const MERGE_SUCCESS: AlertType = {
    severity: 'success',
    title: 'Merge Successful!',
    description: 'The data was successfully merged with the existing database.',
};

export const IMPORT_SUCCESS: AlertType = {
    severity: 'success',
    title: 'Import Successful!',
    description: 'The data was successfully imported into the database.',
};
