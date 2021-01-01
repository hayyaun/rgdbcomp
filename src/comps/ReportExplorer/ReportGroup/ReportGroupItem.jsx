import TreeItem from "@material-ui/lab/TreeItem";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { idsAtom, rgdbAtom } from "~/recoil";
import ReportsList from "./ReportsList";

export default function ReportGroupItem({ item, index, reportGroup }) {
  const [data, setData] = useState();
  const [ids] = useRecoilState(idsAtom);
  const [r0g1] = useRecoilState(rgdbAtom);

  const requires = reportGroup.requires;

  const params = useMemo(() => {
    let newParams = [];
    for (const i in requires) {
      newParams = [...newParams, ids[requires[i]]];
    }
    return newParams;
  }, [ids, requires]);

  useEffect(() => {
    if (typeof item[!r0g1 ? "relational" : "graph"] === "function") {
      axios
        .get(item[!r0g1 ? "relational" : "graph"](...params))
        .then((res) => {
          console.log(res);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }, [ids, item, params, r0g1, reportGroup.requires]);

  return !data ? null : (
    <TreeItem nodeId={"depth1-" + index} label={item.title}>
      <ReportsList index={index} data={data} item={item} />
    </TreeItem>
  );
}
