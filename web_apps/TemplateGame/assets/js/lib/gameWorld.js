define("gameWorld", ["components/gamePhysics"]
                    , function(gamePhysics) {

  const gameWorld = (p, spriteList) => {
    let temp;
    let locals =  {
      player: p,
      playerOutData: undefined,
      playerInData: undefined,
      obstacles: spriteList
    }
    // get rid of init function and add switch statemnet logic to filter sprite list to their different groups
    let init = () => {
      console.log(locals.obstacles);
    }
    temp = Object.assign(locals, gamePhysics(locals));
    return temp;
  }

  return gameWorld;

})
