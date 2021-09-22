import React from "react";
import DropdownList from "react-widgets/lib/DropdownList";
import get from "lodash/get";

const DropdownListInput = ({
  input: { onChange, value },
  valueKey,
  data,
  textField,
  ...others
}) => {
  const [search, setSearch] = React.useState("");
  const [maxResults, setMaxResults] = React.useState(20);
  console.log("search", search);
  return (
    <DropdownList
      filter
      data={data
        .filter(item => {
          const val = get(item, textField) || "";
          return val
            .toString()
            .toLowerCase()
            .includes(search);
        })
        .slice(0, maxResults)}
      onSearch={txt => {
        setSearch(txt.toLowerCase());
        setMaxResults(20);
      }}
      onSelect={evt => onChange(valueKey && evt ? evt[valueKey] : evt)}
      onScroll={({ target }) => {
        const { scrollHeight, scrollTop, clientHeight } = target;
        if (scrollHeight - scrollTop === clientHeight) {
          setMaxResults(maxResults + 20);
        }
      }}
      busySpinner={<span className="fas fa-sync fa-spin" />}
      textField={textField}
      value={value}
      {...others}
    />
  );
};

DropdownListInput.defaultProps = {
  textField: "text",
  valueKey: "value",
  data: []
};

export default DropdownListInput;
