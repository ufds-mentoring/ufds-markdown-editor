import './OutputPane.css'
import { Heading, Link, minorScale, Image } from "evergreen-ui";
import CodeBlock from './CodeBlock/CodeBlock';
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { useEffect, useState } from 'react'
import remarkFrontmatter from 'remark-frontmatter'
import * as fm from 'front-matter'
import { evaluateSync } from '@mdx-js/mdx'
import * as provider from '@mdx-js/react'
import * as runtime from 'react/jsx-runtime'
import { ErrorBoundary } from 'react-error-boundary';

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
        props.setProblemText(content.attributes.title)
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

  function renderMdx(){
    try{
      const {default: Content} = evaluateSync(mdxContent, {...provider, ...runtime, remarkPlugins: [remarkMath, remarkFrontmatter], rehypePlugins: [rehypeKatex]})
      return <Content components={components} />
    }
    catch{
      return <div className="mdxerror"><h3>Invalid MDX</h3></div>
    }
  }

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
        {renderMdx()}
      </ErrorBoundary>
    </div>
  );
}
 
export default OutputPane;