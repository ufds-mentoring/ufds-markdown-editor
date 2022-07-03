import { Card, majorScale } from "evergreen-ui";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

const CodeBlock = ({ children, className }) => {
  const language = className?.replace(/language-/, "");
  return (
    <Card marginY={majorScale(3)} elevation={1}>
      <Highlight
        {...defaultProps}
        theme={theme}
        code={String(children)}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              padding: "10px",
              borderRadius: "4px",
              overflow: "auto",
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </Card>
  );
};

export default CodeBlock;