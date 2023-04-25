import { Page, Main, Header, Section } from '@flumens';
import { Trans as T } from 'react-i18next';
import './styles.scss';

const { P, H } = Section;

const About = () => (
  <Page id="about">
    <Header title="About" />
    <Main id="about">
      <Section>
        <P>
          The LERC Wales mobile application enables you to get involved in
          biological recording in Wales. You can contribute your sightings with
          photos, GPS acquired coordinates, descriptions and other information,
          thus providing scientists with important new biodiversity information
          that contributes to nature conservation, planning, research and
          education.
        </P>
      </Section>

      <Section>
        <H>Who can use the app?</H>
        <P skipTranslation>
          <T>
            We encourage everyone to get involved with recording species as it
            is very easy and quick to submit useful records without specialist
            knowledge. It doesn't matter whether you are an amateur enthusiast
            or a qualified biologist, the LERC Wales app is for anyone who wants
            to contribute to our database observations of the natural
            environment
          </T>
          .
        </P>
      </Section>

      <Section>
        <H>App Development</H>
        <P skipTranslation>
          <T>This app was developed by</T>
          <a href="https://flumens.io" style={{ whiteSpace: 'nowrap' }}>
            {' '}
            Flumens.
          </a>{' '}
          <T>
            A technical consultancy that excels at building bespoke
            environmental science and community focussed solutions.
          </T>
          <T>For suggestions and feedback please do not hesitate to</T>{' '}
          <a href="mailto:apps%40ceh.ac.uk?subject=LERC%20App">
            <T>contact us</T>
          </a>
          .
        </P>
      </Section>
    </Main>
  </Page>
);

export default About;
