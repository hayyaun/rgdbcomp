import { Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { ExpandLessRounded, ExpandMoreRounded } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { CursorPointer } from "../shared";
import ReportGroup from "./ReportGroup/ReportGroup";
import reportGroups from "./reportGroups";
import Selector from "./Selector";
import selectors from "./selectors";

export default function ReportExplorer() {
  const [showSelectors, setShowSelectors] = useState(true);
  const toggleSelectors = useCallback(() => setShowSelectors((v) => !v), []);

  return (
    <Container>
      <Header>
        <Typography variant="subtitle1">Select Items</Typography>
        <CursorPointer>
          {showSelectors ? (
            <ExpandMoreRounded onClick={toggleSelectors} />
          ) : (
            <ExpandLessRounded onClick={toggleSelectors} />
          )}
        </CursorPointer>
      </Header>
      {showSelectors && (
        <SelectorsWrapper>
          {selectors.map((selector, i) => (
            <Selector {...selector} key={i} />
          ))}
        </SelectorsWrapper>
      )}
      {!showSelectors && <Divider />}
      <Header>
        <Typography variant="subtitle1">Reports List</Typography>
      </Header>
      <ReportGroupsWrapper>
        {reportGroups.map((reportGroup, i) => (
          <ReportGroup data={reportGroup} key={i} />
        ))}
      </ReportGroupsWrapper>
    </Container>
  );
}

const Header = styled.div`
  padding: 22px;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
`;

const SelectorsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 22px 12px 22px;
`;

const ReportGroupsWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  overflow-y: scroll;
  padding: 0 22px 12px 22px;
`;

const Container = styled.div`
  flex: 0 0 360px;
  box-sizing: border-box;
  overflow: hidden;
  border-top-right-radius: 48px;
  background-color: #fff5;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;
