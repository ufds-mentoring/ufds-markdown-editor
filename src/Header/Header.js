import { Pane, Button, Dialog, TextInput } from 'evergreen-ui'
import { useState } from 'react';
import { Octokit } from '@octokit/rest';
import { createPullRequest } from 'octokit-plugin-create-pull-request';
import { createOrUpdateTextFile } from '@octokit/plugin-create-or-update-text-file';
import './Header.css'

const Header = (props) => {
  const [isShown, setIsShown] = useState(false)
  const [labelContent, setLabelContent] = useState("Create PR")
  const [textValue, setTextValue] = useState('')
  const [createPR, setCreatePR] = useState(true)
  const [statusText, setStatusText] = useState('')

  const MyOctokit = Octokit.plugin(createPullRequest, createOrUpdateTextFile)
  const octokit = new MyOctokit({auth: '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'});

  function updateStatus(){
    octokit.request('GET /repos/ufds-mentoring/ufds-training/pulls', {
      owner: 'ufds-github-bot',
      repo: 'ufds-training'
    })
    .then((response) => {
      let done = true
      response.data.forEach((obj) => {
        if(String(obj.title) === props.problemText){
          setLabelContent("Update PR")
          setCreatePR(false)
          setStatusText('The existing PR will be updated with this new version')
          done = false
        }
      })
      if(done){
        setLabelContent("Create PR")
        setCreatePR(true)
        setStatusText('A new PR will be created and updated with this new version')
      }
    })
  }

  function confirmGh(close){
    if(createPR){
      octokit.createPullRequest({
        owner: 'ufds-mentoring',
        repo: 'ufds-training',
        title: props.problemText,
        body: "Editorial for " + props.problemText,
        head: (props.problemText).replaceAll(" ", "-"),
        base: "master" /* optional: defaults to default branch */,
        update: false /* optional: set to `true` to enable updating existing pull requests */,
        forceFork: false /* optional: force creating fork even when user has write rights */,
        changes: [
          {
            files: {
              [textValue.substring(textValue.indexOf('pages'))]: props.theText,
            },
            commit: "Updated " + props.problemText,
          },
        ],
      })
    }
    else{
      octokit.createOrUpdateTextFile({
        owner: 'ufds-github-bot',
        repo: 'ufds-training',
        branch: (props.problemText).replaceAll(" ", "-"),
        path: [textValue.substring(textValue.indexOf('pages'))],
        content: props.theText,
        message: "Updated Editorial",
      });
    }

    close()
  }

  return ( 
    <div className="Header">
      <Pane height="60px" display="flex" justifyContent="center" alignItems="center" borderBottom="2px solid #d3d3d3" background='whitesmoke'>
        <h3>UFDS Markdown Editor</h3>
      </Pane>
      <Button onClick={() => setIsShown(true)} position="absolute" top="30px" left="90%" transform="translate(-50%, -50%)">Push to Github</Button>
      <Dialog
        isShown={isShown}
        onOpenComplete={updateStatus}
        title="Create PR/Update file in Github"
        onCloseComplete={() => setIsShown(false)}
        confirmLabel={labelContent}
        onConfirm={(close) => {
          if(textValue !== ''){
            confirmGh(close)
          }
        }}
      >
        <span>File Path: &nbsp;</span>
        <TextInput value={textValue} onChange={e => setTextValue(e.target.value)} width="80%" placeholder='Eg. https://github.com/ufds-mentoring/ufds-training/blob/master/pages/stages/3-ZCO-Editorials/1-ZCO-2012/1-A.-Matched-Brackets.mdx' />
        <div className='statustext'>{statusText}</div>
      </Dialog>
    </div>
  )
}
 
export default Header;