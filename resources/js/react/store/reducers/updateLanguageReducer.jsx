import { languageActionType,settingsKey,Tokens } from '../../constants';

const storedLanguage = localStorage.getItem(Tokens.UPDATED_LANGUAGE);

export default (state = storedLanguage ?? settingsKey.DEFAULT_LOCALE, action) => {
    switch (action.type) {
        case languageActionType.UPDATED_LANGUAGE:
            return action.payload;
        default:
            return state;
    }
};
