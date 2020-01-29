import React from "react";
import { Text, Section, Flex, Container } from "../Elements";
import Widget from "./Widget";

export default function Footer(props) {
  return (
    <Widget {...props}>
      <Section bg="pageBackground" py={32} px={20}>
        <Container>
          <Flex justifyContent="space-between" alignItems="center">
            <Text textStyle="text">Powered By:</Text>
            <Text textStyle="text">Powered By: Mysite.com</Text>
          </Flex>
        </Container>
      </Section>
    </Widget>
  );
}
