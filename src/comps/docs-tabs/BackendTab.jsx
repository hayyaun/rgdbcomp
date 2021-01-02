import { Card, Divider, Typography } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import BrandCardHeader from "@mui-treasury/components/cardHeader/brand";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import FaceGroup from "@mui-treasury/components/group/face";
import { useLightTopShadowStyles } from "@mui-treasury/styles/shadow/lightTop";
import { useN03TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n03";
import axios from "axios";
import cx from "clsx";
import { memo, useEffect, useState } from "react";
import { Row, Space } from "../shared";
import TabContainer from "./TabContainer";
import technologies from "./technologies";
import useCardStyles from "./useCardsStyle";
import ReactMarkdown from "react-markdown";

const cards = technologies.backend;

function FrontendTab() {
  const styles = useN03TextInfoContentStyles();
  const shadowStyles = useLightTopShadowStyles();
  const cardStyles = useCardStyles();

  const [readme, setReadme] = useState("");
  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/rgdbcomp/rgdbcomp-server/master/README.md"
      )
      .then((res) => setReadme(res.data))
      .catch(console.log);
  }, []);

  return (
    <TabContainer>
      <Typography variant="h5" gutterBottom>
        Technologies
      </Typography>
      <Row scrollX style={{ padding: "8px 0 18px 12px", flexShrink: 0 }}>
        {cards.map((card, i) => (
          <Card className={cx(cardStyles.root, shadowStyles.root)}>
            <BrandCardHeader
              image={card.image}
              extra={card.extra}
              classes={{ avatar: cardStyles.brandLogo }}
            />
            <CardContent className={cardStyles.content}>
              <TextInfoContent
                classes={styles}
                overline={card.overline}
                heading={card.heading}
                body={card.body}
              />
            </CardContent>
            <Divider />
            <div style={{ margin: "12px 18px" }}>
              <FaceGroup faces={card.faces} />
            </div>
          </Card>
        ))}
      </Row>
      <Space />
      <Typography variant="h5" gutterBottom>
        Code Sandbox
      </Typography>
      <iframe
        src="https://codesandbox.io/embed/github/rgdbcomp/rgdbcomp-server/tree/master/?fontsize=14&hidenavigation=1&theme=dark&view=editor"
        style={{
          width: "100%",
          height: 500,
          border: 0,
          borderRadius: 4,
          overflow: "hidden",
          flexShrink: 0,
        }}
        title="elated-goodall-3wcrm"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
      <Space />
      <Typography variant="h5" gutterBottom>
        How to Run Locally
      </Typography>
      <ReactMarkdown allowDangerousHtml>{readme}</ReactMarkdown>
    </TabContainer>
  );
}

export default memo(FrontendTab);
