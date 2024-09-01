import { Main } from "src/components/Layout/Main";
import { Section } from "src/components/Layout/Section";
import { Button } from "components/Common/Button";

export function Home() {
  return (
    <div className="content">
      <Main />
      <Section>
        {
          <div className="benefits">
            <div>
              <h2>Benefits of this very cool app</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
                deleniti expedita veniam eligendi iure unde excepturi aliquid
                est itaque nisi possimus quibusdam earum, qui consequuntur
                placeat asperiores minima odit maxime.
              </p>
            </div>
            <div class="benefits-grid">
              <div class="benefits-grid-div1">
                <h4>Benefit One</h4>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam, porro mollitia? Ab, esse harum cumque quae veniam
                  voluptates laborum, quia quis ipsam voluptate consequatur
                  corrupti aliquam praesentium, accusantium natus dolore!
                </p>
                <Button>Go</Button>
              </div>
              <div class="benefits-grid-div2">
                <h4>Benefit Two</h4>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam, porro mollitia? Ab, esse harum cumque quae veniam
                  voluptates laborum, quia quis ipsam voluptate consequatur
                  corrupti aliquam praesentium, accusantium natus dolore!
                </p>
                <Button>Go</Button>
              </div>
              <div class="benefits-grid-div3">
                <h4>Benefit Three</h4>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam, porro mollitia? Ab, esse harum cumque quae veniam
                  voluptates laborum, quia quis ipsam voluptate consequatur
                  corrupti aliquam praesentium, accusantium natus dolore!
                </p>
                <Button>Go</Button>
              </div>
              <div class="benefits-grid-div4">
                <h4>Benefit Four</h4>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam, porro mollitia? Ab, esse harum cumque quae veniam
                  voluptates laborum, quia quis ipsam voluptate consequatur
                  corrupti aliquam praesentium, accusantium natus dolore!
                </p>
                <Button>Go</Button>
              </div>
            </div>
          </div>
        }
      </Section>
      <Section>
        {
          <div className="action">
            <div className="action-content">
              <h3>Mental health is also an essential</h3>
              <Button>Join Now</Button>
            </div>
          </div>
        }
      </Section>
    </div>
  );
}
