import defaultSurvey from 'Survey/Default/config';
import listSurvey from 'Survey/List/config';
// import mothSurvey from 'Survey/Moth/config';
// import plantSurvey from 'Survey/Plant/config';
import { Survey } from 'Survey/common/config';

export const getSurveyQuery = ({ id }: Survey) => ({
  match: {
    'metadata.survey.id': id,
  },
});

export const matchAppSurveys = {
  bool: {
    should: [
      defaultSurvey,
      listSurvey,
      // plantSurvey, mothSurvey
    ].map(getSurveyQuery),
  },
};
