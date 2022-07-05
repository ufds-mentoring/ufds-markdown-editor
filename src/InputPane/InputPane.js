import { Textarea } from 'evergreen-ui';
import { useEffect, useState } from 'react';
import './InputPane.css'

const InputPane = (props) => {
  const [theString, setTheString] = useState(`---
title: The title of the lesson
authors:
- Authors separated
- like 
- this
---

Headings:
# Largest heading
## Larger heading
### Large heading
#### Small heading
##### Smaller heading
###### Smallest heading
However, please never use the largest heading. It is only reserved for the title, which is automatically generated.

This is a paragraph. *This text is italicized*. _This is also italicized_. **This text is bolded**.
***This text is bolded AND italicized***.

> This is a block quote

- This is a list
- with items
- and cool stuff

1. This is an
1. ordered list
1. cool

~~strike through text~~. [Link text](https://example.com). \`inline code\`

\`\`\`cpp
#include <block code.h>
\`\`\`

This is an image:

![alt text of image](https://ufds.cc/preview.jpg)

<details>
<summary>Click here for a hint</summary>

This is the content! **Styling** _works_ $cool$

\`\`\`cpp
using namespace std;
\`\`\`
</details>

This is $A=\pi$ inline

And this is a block:

$$
\\int_{-1}^1\\frac1x\\sqrt{\\frac{1+x}{1-x}}\\ln\\left(\\frac{2x^2+2x+1}{2x^2-2x+1}\\right)\\ \\mathrm dx 
$$
` )
  const changeInputText = props.changeInputText

  function handleTab(event){
    if(event.keyCode === 9){
      event.preventDefault()
      
      setTheString(theString + (" ").repeat(props.tabSize))
      changeInputText(theString + (" ").repeat(props.tabSize))
    }
  }

  function setString(event){
    setTheString(event.target.value)
    changeInputText(event.target.value)
  }

  useEffect(() => {
    changeInputText(theString)
  },
  [])

  return ( 
    <div className="InputPane">
      <Textarea className='textarea' placeholder='Enter Markdown Here...' value={theString} onChange={(e) => setString(e)} onKeyDown={(e) => handleTab(e)} />
    </div>
  );
}
 
export default InputPane;