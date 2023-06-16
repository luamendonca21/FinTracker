import React, { useState } from "react";

import { Tooltip } from "@rneui/themed";

const ToolTip = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip
      visible={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      {...props}
    />
  );
};

export default ToolTip;
