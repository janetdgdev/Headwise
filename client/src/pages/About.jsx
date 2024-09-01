import { Section } from "components/Layout/Section";
import { Card } from "src/components/Common/Card";

export function About() {
  return (
    <div className="content">
      <Section>
        {
          <div className="about">
            <div className="about-app">
              <h2>This is the Headwise App</h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint
                cum unde beatae veritatis iure? Doloremque sint sit facilis,
                incidunt non totam eius eum amet ratione similique inventore,
                mollitia officiis, modi sequi nobis assumenda odit laborum sunt
                commodi asperiores voluptatem. Nostrum sunt provident, libero
                earum iste doloribus magnam qui asperiores voluptatum.
              </p>
            </div>
            <div className="about-sources">
              <h3>Sources</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nemo quia odio ipsa eum facilis non, aliquam asperiores commodi ut.</p>
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </div>
        }
      </Section>
    </div>
  );
}
