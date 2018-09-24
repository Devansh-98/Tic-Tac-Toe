var turn = 0;//Counter for turn
var board_pos=[0,0,0,0,0,0,0,0,0];//array for holding current board position
var enabled = false;// Variable to hold the state of game (finised or Continue)
var img_srcs = ["cross.png","zero.png"];
var player_turn = 1;
var num_players=1;
var computer_turn = false;
window.onload = function() {
  view_home();
};
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  console.log('Taking a break...');
  await sleep(2000);
  console.log('Two seconds later');
}
function reset_game()//function to reset the board
{
  turn = 0;
  enabled = true;
  board_pos=[0,0,0,0,0,0,0,0,0];
  document.getElementById("Result").innerHTML = "Match Hasen't yet Started";
  if(num_players==1&&player_turn==2)
  {
    document.getElementById("Result").innerHTML = "Game going on!!!";
    board_pos[4]=1;
    turn++;
  }
  sleep(500).then(() => {
    generate_board();
  });
}

function startGame(){//function to start the game
  player_choice();
  setPlayerMarker();
  setPlayerTurn();
  document.getElementById('Player_turn').style.display='none';
  document.getElementById('Player_choice').style.display='none';
  document.getElementById('player_marker').style.display='none';
  document.getElementById('start_game').style.display='none';
  document.getElementById('reset').style.display='';
  document.getElementById('home').style.display='';

  enabled = true;
  reset_game();
}

function view_home(){//Function to go back to home screen
  document.getElementById('Player_turn').style.display='';
  document.getElementById('Player_choice').style.display='';
  document.getElementById('player_marker').style.display='';
  document.getElementById('start_game').style.display='';
  document.getElementById('reset').style.display='none';
  document.getElementById('home').style.display='none';
  turn = 0;
  board_pos=[0,0,0,0,0,0,0,0,0];
  generate_board();
  document.getElementById("Result").innerHTML = "Match Hasen't yet Started";
  enabled = false;
}
function player_choice()//Function to change menu options depending on previous selections
{
  id_player_choice = document.getElementById('Player_choice');
  if(id_player_choice.value==2)
  {
    document.getElementById('Player_turn').style.display='none';
  }
  else
  {
    computer_turn=true;
    document.getElementById('Player_turn').style.display='';
  }
  num_players= id_player_choice.value;
}


function setPlayerTurn(){//Setting player turn
  player_turn=document.getElementById('Player_turn').value;
}


function setPlayerMarker(){//setting player turn
  if(document.getElementById('Player_choice').value==2)
  {
    if(document.getElementById('player_marker').value=='cross')
    {
      img_srcs = ["cross.png","zero.png"];
    }
    else
    {
      img_srcs = ["zero.png","cross.png"];
    }
  }
  if(document.getElementById('Player_choice').value==1)
  {
    if((document.getElementById('Player_turn').value==1 && document.getElementById('player_marker').value=='cross')||(document.getElementById('Player_turn').value==2 && document.getElementById('player_marker').value=='zero'))
    {
      img_srcs = ["cross.png","zero.png"];
    }
    else
    {
      img_srcs = ["zero.png","cross.png"];
    }
  }
}


function game_result()
{
  var flag = false;
  for(var i = 0; i<7;i+=3 )//Check for rows
  {
    if(board_pos[i]==board_pos[i+1]&&board_pos[i]==board_pos[i+2])
    {
      if(board_pos[i]==1)
      {
        document.getElementById("Result").innerHTML = "Player 1 won!!";
        return 1;
      }
      else if(board_pos[i]==2)
      {
        document.getElementById("Result").innerHTML = "Player 2 won!!";
        return 2;
      }
    }
  }

  for(var i=0;i<3;i++ )//Check for columns
  {
    if(board_pos[i]==board_pos[i+3]&&board_pos[i]==board_pos[i+6])
    {
      if(board_pos[i]==1)
      {
        document.getElementById("Result").innerHTML = "Player 1 won!!";
        return 1;
      }
      else if(board_pos[i]==2)
      {
        document.getElementById("Result").innerHTML = "Player 2 won!!";
        return 2;
      }
    }
  }

  if(board_pos[0]==board_pos[4]&&board_pos[0]==board_pos[8])//check for principle diagonal
  {
    if(board_pos[0]==1)
    {
      document.getElementById("Result").innerHTML = "Player 1 won!!";
      return 1;
    }
    else if(board_pos[0]==2)
    {
      document.getElementById("Result").innerHTML = "Player 2 won!!";
      return 2;
    }
  }

  if(board_pos[2]==board_pos[4]&&board_pos[2]==board_pos[6])//check for secondry diagonal
  {
    if(board_pos[2]==1)
    {
      document.getElementById("Result").innerHTML = "Player 1 won!!";
      return 1;
    }
    else if(board_pos[2]==2)
    {
      document.getElementById("Result").innerHTML = "Player 2 won!!";
      return 2;
    }
  }

  for(var i =0;i<9;i++)//check for draw
  {
    if(board_pos[i]==0)
    {
      flag=true;
    }
  }
  if(flag)
  {
    document.getElementById("Result").innerHTML = "Game going on!!!";
    return 0;
  }
  else
  document.getElementById("Result").innerHTML = "Match Draw!!";
  return 3;
}

function changeImage(id_img)//function to be executed when a chance is taken
{
  if(enabled)
  {
    var image = document.getElementById(id_img)
    var int_id = parseInt(id_img);
    if(board_pos[int_id]!=0)
    {
      alert("Invalid Move");
    }
    else if(turn%2 == 0)
    {
      board_pos[int_id]=1;
      image.src = img_srcs[0];
      turn++;
    }
    else
    {
      board_pos[int_id]=2;
      image.src = img_srcs[1];
      turn++;
    }
    result = game_result()
    if(result!=0)
    {
      if(result==1)
      {
        sleep(500).then(() => {
          alert("player 1 won\n Press Reset for next game");
          // Do something after the sleep!
        });
        enabled = false;
      }
      else if(result==2)
      {
        sleep(500).then(() => {
          // Do something after the sleep!
          alert("player 2 won\nPress Reset for next game");
        });
        enabled = false;
      }
      else if(result==3)
      {
        sleep(500).then(() => {
          // Do something after the sleep!
          alert("Match Draw\nPress Reset for next game");
        });
        enabled = false;
      }
    }
    else if(num_players==1)
    {
      move();
      sleep(500).then(() => {
        // Do something after the sleep!
        generate_board();
      });
      turn++;
      result = game_result()
      if(result!=0)
      {
        if(result==1)
        {
          sleep(500).then(() => {
            // Do something after the sleep!
            alert("player 1 won\nPress Reset for next game");
          });
          enabled = false;
        }
        else if(result==2)
        {
          sleep(500).then(() => {
            // Do something after the sleep!
            alert("player 2 won\nPress Reset for next game");
          });
          enabled = false;
        }
        else if(result==3)
        {
          sleep(500).then(() => {
            // Do something after the sleep!
            alert("Match Draw\nPress Reset for next game");
          });
          enabled = false;
        }
      }
    }
  }
}

function generate_board()
{
  for(var i=0;i<9;i++)
  {
    if(board_pos[i]==0)
    {
      document.getElementById(i).src = 'blank.jpeg';
    }
    else if(board_pos[i]==1)
    {
      document.getElementById(i).src = img_srcs[0];
    }
    else
    {
      document.getElementById(i).src = img_srcs[1];
    }
  }
}
function move()
{
  var y,x = turn%2;
  x++;
  if(x==1)
  y=2;
  else
  y=1;
  i=-1,k=0,count=0,j=0;
  while(i<=6)//Winning Moves
  {
    for(j=1;j<=3;j++)
    {
      if(board_pos[i+j]==x)
      count++;
      else if(board_pos[i+j]==y)
      count=-2;
    }
    if(count==2)
    {
      board_pos[i+1]=x;
      board_pos[i+2]=x;
      board_pos[i+3]=x;
      return 0;
    }
    count=0;
    i+=3;
  }
  count=0;
  i=0;
  while(i<3)
  {
    for(j=0;j<3;j++)
    {
      if((board_pos[3*j+i])==x)
      count++;
      else if((board_pos[3*j+i])==y)
      count=-2;
    }
    if(count==2)
    {
      board_pos[i]=x;
      board_pos[i+3]=x;
      board_pos[i+6]=x;
      return 0;
    }
    count=0;
    i++;
  }
  count=0;
  i=0;
  while(i<9)
  {
    if(board_pos[i]==x)
    count++;
    else if(board_pos[i]==y)
    count=-2;
    i+=4;
  }
  if(count==2)
  {
    board_pos[0]=x;
    board_pos[4]=x;
    board_pos[8]=x;
    return 0;
  }
  i=2;
  count=0;
  while(i<7)
  {
    if(board_pos[i]==x)
    count++;
    else if(board_pos[i]==y)
    count=-2;
    i+=2;
  }
  if(count==2)
  {
    board_pos[2]=x;
    board_pos[4]=x;
    board_pos[6]=x;
    return 0;
  }
  count=0;i=-1;//Move to avoid defeat
  while(i<6)
  {
    for(j=1;j<=3;j++)
    {
      if(board_pos[i+j]==y)
      count++;
      else if(board_pos[i+j]==x)
      count=-2;
    }
    if(count==2)
    {
      if(board_pos[i+1]==0)
      board_pos[i+1]=x;
      else if(board_pos[i+2]==0)
      board_pos[i+2]=x;
      else if(board_pos[i+3]==0)
      board_pos[i+3]=x;
      return 0;
    }
    count=0;
    i+=3;
  }
  count=0;
  i=0;
  while(i<3)
  {

    for(j=0;j<3;j++)
    {
      if((board_pos[3*j+i])==y)
      count++;
      else if((board_pos[3*j+i])==x)
      count=-2;
    }
    if(count==2)
    {
      if(board_pos[i]==0)
      board_pos[i]=x;
      else if(board_pos[i+3]==0)
      board_pos[i+3]=x;
      else if(board_pos[i+6]==0)
      board_pos[i+6]=x;
      return 0;
    }
    count=0;
    i++;
  }
  count=0;
  i=0;
  while(i<9)
  {
    if(board_pos[i]==y)
    count++;
    else if(board_pos[i]==x)
    count=-2;
    i+=4;
  }
  if(count==2)
  {
    if(board_pos[0]==0)
    board_pos[0]=x;
    else if(board_pos[4]==0)
    board_pos[4]=x;
    else if(board_pos[8]==0)
    board_pos[8]=x;
    return 0;
  }
  i=2;
  count=0;
  while(i<7)
  {
    if(board_pos[i]==y)
    count++;
    else if(board_pos[i]==x)
    count=-2;
    i+=2;
  }
  if(count==2)
  {
    if(board_pos[2]==0)
    board_pos[2]=x;
    else if(board_pos[4]==0)
    board_pos[4]=x;
    else if(board_pos[6]==0)
    board_pos[6]=x;
    return 0;
  }
  count=0;
  if(turn==1)//move when none of aboard_posove happening
  {
    if(board_pos[4]==y)
    {
      board_pos[0]=x;
      return 0;
    }
    else
    {
      board_pos[4]=x;
      return 0;
    }
  }
  if(turn==2)
  {
    if(board_pos[5]==y||board_pos[7]==y)
    {
      board_pos[0]=x;
      return 0;
    }
    if(board_pos[1]==y||board_pos[3]==y)
    {
      board_pos[8]=x;
      return 0;
    }
    for(i=0;i<9;i+=2)
    {
      if(i==4)
      continue;
      if(board_pos[i]==y)
      {
        board_pos[8-i]=x;
        return 0;
      }
    }
  }
  if(turn==3)
  {
    count=0;
    i=0;
    while(i<9)//for diagnols
    {
      if(board_pos[i]==y)
      count++;
      i+=4;
    }
    if(count==2)
    {
      if(board_pos[4]==x)
      board_pos[3]=x;
      else
      board_pos[2]=x;
      return 0;
    }
    i=2;
    count=0;
    while(i<7)
    {
      if(board_pos[i]==y)
      count++;
      i+=2;
    }
    if(count==2)
    {
      if(board_pos[4]==x)
      board_pos[5]=x;
      else
      board_pos[8]=x;
      return 0;
    }
    count=0;
    i=1;k=3;
    while(i<5)//for 258,456
    {
      while(i<9)
      {
        if(board_pos[i]==y)
        count++;
        i+=k;
      }
      if(count==2)
      {
        board_pos[0]=x;
        return 0;
      }
      if(i==10)
      {
        k=1;
        i=3;
      }
    }
    if(board_pos[1]==board_pos[3]&&board_pos[1]==y)
    {
      board_pos[0]=x;
      return 0;
    }
    if(board_pos[5]==board_pos[7]&&board_pos[7]==y)
    {
      board_pos[8]=x;
      return 0;
    }
    if(board_pos[1]==board_pos[5]&&board_pos[5]==y)
    {
      board_pos[2]=x;
      return 0;
    }
    if(board_pos[3]==board_pos[7]&&board_pos[3]==y)
    {
      board_pos[6]=x;
      return 0;
    }
    if((board_pos[0]==board_pos[7]&&board_pos[0]==y)||(board_pos[6]==board_pos[1]&&board_pos[1]==y))
    {
      board_pos[3]=x;
      return 0;
    }
    if((board_pos[2]==board_pos[7]&&board_pos[2]==y)||(board_pos[8]==board_pos[1]&&board_pos[1]==y))//Should have reached here
    {
      board_pos[4]=x;
      return 0;
    }
    if((board_pos[0]==board_pos[5]&&board_pos[0]==y)||(board_pos[2]==board_pos[3]&&board_pos[2]==y))
    {
      board_pos[1]=x;
      return 0;
    }
    if((board_pos[6]==board_pos[5]&&board_pos[5]==y)||(board_pos[8]==board_pos[3]&&board_pos[0]==y))
    {
      board_pos[7]=x;
      return 0;
    }
  }
  if(turn==4)
  {
    for(i=0;i<9;i+=2)
    {
      if(i==4)
      continue;
      if(board_pos[i]==y&&(board_pos[1]==y||board_pos[3]==y||board_pos[5]==y||board_pos[7]==y))
      {
        if(i==6||i==8)
        board_pos[i-6]=x;
        else if(i==0||i==2)
        board_pos[i+6]=x;
        return 0;
      }

    }
  }
  if(turn==5)
  {
    for(i=0;i<9;i++)
    {
      if(board_pos[i]==0)
      {
        board_pos[i]=x;
        return 0;
      }
    }
  }
  if(turn==6)
  {
    for(i=0;i<9;i++)
    {
      if(board_pos[i]==0&&board_pos[8-i]==0)
      {
        board_pos[i]=x;
        return 0;
      }
    }
  }
  if(turn==6||turn==7||turn==8)
  {
    for(i=0;i<9;i++)
    {
      if(board_pos[i]==0)
      {
        board_pos[i]=x;
        return 0;
      }
    }
  }
}
