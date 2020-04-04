new Vue({
  el: "#app",
  data: {
    attackQuotes: ["Player is going to stay home", "Player wear gloves", "Player perform social distance"],
    covidHealth: 100,
    playerHealth: 100,
    isGameRunning: false,
    canSpecialAttack: false,
    iterationsUntilSpecialAttack: 3,
    actionLogs: []
  },
  methods: {
    startGame: function() {
      this.isGameRunning = true
      this.playerHealth = 100
      this.covidHealth = 100
      this.actionLogs = []
    },
    attack: function() {
      this.attackTurn(2, 10)
      this.iterateSpecialAttack()
    },
    specialAttack: function() {
      if (this.iterationsUntilSpecialAttack > 0) {
        this.writteAction(true, "You have to wait 3 turns figthing against COVID in the pharmacy line to buy soap for your hands")
      } else {
        this.iterateSpecialAttack()
        this.attackTurn(10, 17)
        this.canSpecialAttack = false
        this.iterationsUntilSpecialAttack = 3
      }
    },
    heal: function() {
      const healQuantity = this.calculateRandomFromInterval(3, 10)
      if (this.playerHealth + healQuantity <= 100)
        this.playerHealth += healQuantity
      else
        this.playerHealth = 100

      this.writteAction(true, `Yeah, you put your mask on. ${healQuantity} units of life more!`)

      this.covidAttack()
    },
    run: function() {
      if (Math.random() * 10 > 7) {
        this.writteAction(true, "You washed your hands and run safe from COVID!!")
        this.isGameRunning = false
      } else {
        this.iterateSpecialAttack()
        this.writteAction(false, "Oh no, COVID catched you hugging your friend and doesn't let you go!")
        this.covidAttack()
      }
    },
    attackTurn: function(playerMinDamage, playerMaxDamage) {
      this.playerAttack(playerMinDamage, playerMaxDamage)
      this.covidAttack()
      this.checkIfGameFinished()
    },
    covidAttack: function() {
      let damageCovid = this.calculateRandomFromInterval(5, 12)
      this.playerHealth -= damageCovid
      this.writteAction(false, `COVID made ${damageCovid} damage to player`)
    },
    playerAttack: function(minDamage, maxDamage) {
      let damagePlayer = this.calculateRandomFromInterval(minDamage, maxDamage)
      this.covidHealth -= damagePlayer

      let rand = this.calculateRandomFromInterval(0, this.attackQuotes.length - 1)
      const actionText = `${this.attackQuotes[rand]} and made ${damagePlayer} damage to covid`

      this.writteAction(true, actionText)
    },
    calculateRandomFromInterval: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min)
    },
    checkIfGameFinished: function() {
      if (this.playerHealth <= 0) {
        this.playerHealth = 0
        this.actionLogs = [{
          isPlayer: false,
          text: "You are so sick that you have to lay on bed for 15 days 😷"
        }]
        this.isGameRunning = false
      } else if (this.covidHealth <= 0) {
        this.covidHealth = 0
        this.actionLogs = [{
          isPlayer: true,
          text: "You beat COVID!! 🎉 But, for your safety go home"
        }]
        this.isGameRunning = false
      }
    },
    writteAction: function(isPlayerText, text) {
      this.actionLogs.unshift({
        isPlayer: isPlayerText,
        text: text
      })
    },
    iterateSpecialAttack: function() {
      if (this.iterationsUntilSpecialAttack > 0) {
        this.iterationsUntilSpecialAttack -= 1
      } else {
        this.canSpecialAttack = true
      }
    }
  }
})
