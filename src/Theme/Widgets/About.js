import React, { useContext } from "react";
import uuid from "uuid";
import {
  Base,
  Text,
  Heading,
  Section,
  Flex,
  Container,
  Grid,
  EditableImage,
  Button
} from "../Elements";
import Widget from "./Widget";
import AppStoreContext, { getAboutCards } from "../../common/AppStoreContext";

const textString =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et ligula ullamcorper malesuada proin libero nunc.";
export default function About(props) {
  const { state } = useContext(AppStoreContext);
  const data = getAboutCards(state);
  return (
    <Widget {...props}>
      <Section bg="pageBackground" py={80} px={20}>
        <Container>
          <Grid gridTemplateColumns="1fr 1fr 1fr" gridGap="2em">
            {data.map(({ id, img }, i) => (
              <Flex key={i} flexDirection="column" justifyContent="center">
                <EditableImage
                  id={id}
                  editing={i === 0}
                  treatment="cover"
                  height={200}
                  src={img}
                />
                <Heading level={4} textStyle="h4" mt={24} mb={24}>
                  Sub Heading
                </Heading>
                <Text textStyle="text">{textString}</Text>
                <Base mt={24}>
                  <Button variant="secondary">Learn More</Button>
                </Base>
              </Flex>
            ))}
          </Grid>
        </Container>
      </Section>
    </Widget>
  );
}
