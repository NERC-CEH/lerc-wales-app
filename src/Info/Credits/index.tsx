import { Trans as T } from 'react-i18next';
import { Page, Main, Header, Section } from '@flumens';
import sponsorsLogo from './sponsor_logo.png';
import './styles.scss';

const { P, H } = Section;

export default () => (
  <Page id="credits">
    <Header title="Credits" />
    <Main>
      <img src={sponsorsLogo} alt="" />

      <Section>
        <H>
          We are very grateful for all the people that helped to create this
          app:
        </H>
        <P skipTranslation className="credits">
          <span>David Slade</span>
          <span>Karolis Kazlauskis</span>
          <span>Vilius Stankaitis</span>
          <span>Tim May</span>
          <span>Jo Milborrow</span>
          <span>Adam Rowe</span>
          <span>Jim Bacon</span>
          <span>David Roy</span>
        </P>
      </Section>

      <Section>
        <P>
          The development was led by SEWBReC, and was jointly funded by BIS,
          WWBIC and Cofnod.
        </P>
        <P>
          Also thanks to all the beta testers and the rest of the LERC Wales
          staff for their input.
        </P>
      </Section>

      <Section>
        <H skipTranslation>
          <T>Welcome screen credits</T>:
        </H>
        <P skipTranslation className="credits">
          <span>UK Ladybird Survey</span>
        </P>
      </Section>

      <Section>
        <H>Icons were made by</H>
        <P skipTranslation className="credits">
          <a
            href="https://www.flaticon.com/authors/nhor-phai"
            title="Nhor Phai"
          >
            Nhor Phai
          </a>
          ,{' '}
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </P>
      </Section>
    </Main>
  </Page>
);
