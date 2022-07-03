import './OutputPane.css'
import MDX from '@mdx-js/runtime'
import { Pane, Heading, Link, Button, ChevronLeftIcon, ChevronRightIcon, majorScale, minorScale, Image } from "evergreen-ui";
import CodeBlock from './CodeBlock/CodeBlock';
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import {ErrorBoundary} from 'react-error-boundary'
import { useEffect, useState } from 'react'

const OutputPane = (props) => {
  const [mdxContent, setMdxContent] = useState('')

  const components = {
    pre: (props) => <div {...props} />,
    a: Link,
    code: CodeBlock,
    img: (props) => <Image loading='lazy' maxWidth='100%' {...props} />,
  }

  useEffect(() => {
    setMdxContent(String(props.inputText))
  },
  [props.inputText])

  function ErrorFallback({error, resetErrorBoundary}) {
    useEffect(() => {
      resetErrorBoundary()
    },
    [props.inputText])

    return (
      <div class="mdxerror">
        <h3>Invalid MDX</h3>
      </div>
    )
  }

  return (
    <div className="OutputPane">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <MDX components={components} children={mdxContent} remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} />
      </ErrorBoundary>
    </div>
  );
}
 
export default OutputPane;