import React, { useMemo } from "react";

import { List, ListItem } from "../../Theme/Elements/List";
import { Icon, ToolbarIcon } from "../../Theme/Elements/Icon";
import * as cropStyles from "../../constants/cropStyles";

const icons = [
  { name: cropStyles.square, label: "Square" },
  { name: cropStyles.horizontal, label: "Horizontal" },
  { name: cropStyles.vertical, label: "Vertical" },
  { name: cropStyles.freeform, label: "Freeform" }
];

export default function Toolbar({ onStartCrop }) {
  return (
    <div className="image-edit-toolbar">
      <ToolbarIcon name="crop">
        <List className="toolbar-list">
          {icons.map(icon => (
            <ListItem onClick={() => void onStartCrop(icon.name)}>
              <Icon name={icon.name} />
              <span>{icon.label}</span>
            </ListItem>
          ))}
        </List>
      </ToolbarIcon>
    </div>
  );
}
