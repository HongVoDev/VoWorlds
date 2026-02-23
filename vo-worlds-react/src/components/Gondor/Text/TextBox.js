import './TextBox.css';
import Gallery from './Gallery/Gallery';

function TextBox({ choice }) {
  if (choice === 1) {
    return (
      <div class="container1">

        <div class="title-section">
          <div class="titl">Starting New Projects: My Thought Proccess</div>
          <hr class="horizontal-line"/>
        </div>

        <div class="content-section">
          <div class="para">
    My approach to new projects prioritizes user experience from the outset. I start with a broad overview, visualizing the webpage layout and identifying core functionalities to inform the initial UX design, which I develop independently. This initial phase involves careful consideration of individual component behavior and interactions within the application.</div><br/>
 
      
          <div class="para">
            After solidifying the user experience vision, 
            I transition to technology exploration. This involves
             researching potential technology stacks, carefully 
             evaluating their advantages, disadvantages, and 
             trade-offs. This research then dictates the system
              architecture design, which is broken down into 
              manageable tasks. My notes for thewordproject.site and
               this website, including architectural system
                diagrams, exemplify this iterative process, 
                demonstrating how the concept progressively 
                evolves with detailed specifications and 
                technology choices. 
          </div><br/>
          <img class="meme2" src="../notes1.JPEG" alt="Related Image"/><br/>
          <img class="meme3" src="../diagram1.PNG" alt="Related Image"/><br/>
          <div class="pics-title2">Original notes and system design for current website</div>
<br/>
          <img class="meme2" src="../notes2.JPEG" alt="Related Image"/><br/>
          <img class="meme3" src="../diagram2.PNG" alt="Related Image"/><br/>
          <div class="pics-title2">Original notes and system design for thewordproject.site</div>

         <br/> <div class="para">
        This structured methodology 
                ensures a comprehensive grasp of the project scope, 
                preemptively addresses potential obstacles, 
                and ultimately contributes to a more streamlined 
                and effective execution. </div>
        </div>
        <br/>

      </div>
    );}

    else if (choice === 2) {
      return (
        <div class="container1">

        <div class="title-section">
          <div class="titl">Communication Lessons: What I've Learned</div>
          <hr class="horizontal-line"/>
        </div>

        <div class="content-section">
          
    <div class="para">
               As a kid, I was always timid. I avoided confrontation and was always scared to speak up, afraid to disturb the peace. When I was 18, I moved to the States from Vietnam. Being all alone in Chicago, figuring out how to survive the winter in the Windy City while juggling college life and transportation, was very difficult.
</div><br/><div class="para">
I remember my first apartment; it was near finals exam week, so I was really stressed. My upstairs neighbors were being loud, sometimes throughout the night. I couldn't rest or focus on my studying and grew more and more tired. I thought of going to ask them to quiet down, but I was really anxious. Thoughts popped up in my head about how they might perceive me or how that could upset them. I contemplated a lot about whether to talk to them or not.
</div><br/><div class="para">
Lots of fear crept in, but I knew that this was something I had to do. I mustered all the courage that I had and went upstairs. I knocked on the door; a lady opened it, revealing a party inside. I told her that it was finals week and that I was particularly stressed out, and I was wondering if they could keep it down a bit. She told me, "Yes, sure, we can." I went downstairs and thought it didn't go half as badly as I thought, and they didn't seem upset or anything. Wow, I let out a breath of relief; that was so much easier than just letting this go on without saying anything. They kept it down and I was able to rest and study better. Wait, everything was solved just like that? Just by expressing what I needed? That's when it started to click: communication is extremely important; it resolves things. It allows you to advocate for yourself and find solutions you might not have thought possible otherwise.This small act showed me that voicing concerns, even when daunting, can lead to surprisingly positive outcomes and be empowering.
</div><br/><div class="para">
Another story happened later, when I started working as a software developer, I was always told that I was very good at digging into codebases, troubleshooting, and documenting. I knew that was my strength because when I learn something (whether it's a codebase, my work item, a new technology, or code implementation), I dig very deep into learning (wikis, online videos, previous work items, research) to ensure I completely understand what changes I'm trying to make, what the impact, benefit, and tradeoff are, and also to satisfy my curiosity. There was another software engineer who started the same time I did. I don't think he wrote much code or contributed to any wikis, but he accomplished a lot more than me. He got a lot more work items completed in the same amount of time and got a lot of recognition. I couldn't understand why; I knew that I was more sound than him in my technical ability, but somehow, he got more work done. Then I realized that he was an amazing communicator. He knew when and who to reach out to when he was stuck on his work item, and he also fostered a lot of relationships through those sessions, hence got more recognition. Even I was reached out to a lot by him, and I really enjoyed those sessions; I got to help him as I could really reiterate what I learned to him and solidify my knowledge (they say you truly know something when you are able to teach it). I realized that with every work item I took on, I tended to do so much research on my own, and there's only so much you can do sometimes when the gap in my knowledge was too vast for the particular work item. Again, I realized if I had communicated, reached out to a senior developer on my team, and asked for help, I would have gotten things resolved much faster, and I would have learned the right way through that conversation as well. Communication is so important because it's a shortcut to knowledge and efficiency. It prevents you from reinventing the wheel and allows you to leverage the collective intelligence of your team. It allowed me to learn when to be independent in solving problem and when I need assistance to solve a complex problems and ask the right questions.
</div><br/><div class="para">
Knowing what I know now, I reach out for help often, always include others in my brainstorming sessions, ask lots of questions to gain other perspectives, and confidently express my thoughts and perspectives; after all, communicating is a two-way street. Other's opinions are just as valid as mine. And by embracing open communication, I am able to build strong relationships and create a supportive atmosphere where everyone can succeed.
       </div>
</div>
  

      </div>
      );
  } 
  else {
    return (
       <div class="container1">

        <div class="title-section">
          <div class="titl">Beyond Programming: Hobbies and Interests</div>
          <hr class="horizontal-line"/>
        </div>

        <div class="content-section">
<div class="para">
            In my free time, I enjoy drawing and photography. I 
            find that both activities allow me to express my creativity,
             observe the world in new ways, and develop my attention to detail.
              It's a way for me to connect with 
              others who share similar interests and to 
              continually hone my artistic skills.
              You can see some of my work on my Instagram pages. 
          </div>
          
        <div><Gallery choice={1}></Gallery></div>
        <div class="pics-title">
          <a class="sa" href="https://www.instagram.com/drawwhenreallybored/"
          target="_blank">Drawing Instagram</a>
          </div>
        
        <div><Gallery choice={2}></Gallery></div>
        <div class="pics-title">
          <a class="sa" href="https://www.instagram.com/meganvo307/"
          target="_blank">Photography Instagram</a>
          </div>

        <br/><div class="para">
            I'm also an avid collector of Pop figures! It's a fun
            hobby that brings me joy and allows me to indulge in my love for pop culture.
            </div>
          <div><Gallery choice={3}></Gallery></div>
   
</div>
      </div>
    );
  } 

}

export default TextBox;
