import './OutputPane.css'
import MDX from '@mdx-js/runtime'
import { Heading, Link, minorScale, Image } from "evergreen-ui";
import CodeBlock from './CodeBlock/CodeBlock';
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import {ErrorBoundary} from 'react-error-boundary'
import { useEffect, useState } from 'react'
import remarkFrontmatter from 'remark-frontmatter'
import * as fm from 'front-matter'

const OutputPane = (props) => {
  const [mdxContent, setMdxContent] = useState('')
  const [lesson, setLesson] = useState('')
  const [authorList, setAuthorList] = useState('')

  const components = {
    pre: (props) => <div {...props} />,
    a: Link,
    code: CodeBlock,
    img: (props) => <Image loading='lazy' maxWidth='100%' {...props} />,
  }

  useEffect(() => {
    let str = String(props.inputText)
    if(fm.test(str)){
      try{
        let content = fm(str)
        setLesson(content.attributes.title)
        let authors = 'By ' + content.attributes.authors?.join(", ")
        setAuthorList(authors)
      }
      catch(err){
        setLesson('')
        setAuthorList('')
      }
    }
    else{
      setLesson('')
      setAuthorList('')
    }
    setMdxContent(str)
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
        <Heading marginBottom={minorScale(2)} size={900}>
          {lesson}
        </Heading>
        <Heading marginBottom={minorScale(8)} size={600} color="#474d66">
          {authorList}
        </Heading>
        <MDX components={components} children={mdxContent} remarkPlugins={[remarkMath, remarkFrontmatter]} rehypePlugins={[rehypeKatex]} />
      </ErrorBoundary>
    </div>
  );
}
 
export default OutputPane;