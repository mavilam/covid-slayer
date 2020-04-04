new Vue({
  el: "#app",
  data: {
    attackQuotes: ["Player wears a mask", "Player wear gloves", "Player perform social distance"],
    initHealth: 100,
    covidHealth: 100,
    playerHealth: 100,
    isGameRunning: false,
    canHeal: false,
    canSpecialAttack: false,
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
    },
    specialAttack: function() {
      this.attackTurn(10, 17)
    },
    heal: function() {
      if (this.playerHealth <= 90)
        this.playerHealth += 10
      else
        this.playerHealth = 100

      this.writteAction(true, "Yeah, you closed yor house door, throw away the keys")

      this.covidAttack()
    },
    run: function() {
      if (Math.random() * 10 > 5) {
        this.writteAction(true, "You washed your hands and run safe from COVID!!")
        this.isGameRunning = false
      } else {
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
      let damageCovid = this.calculateRandomFromInterval(4, 10)
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
        this.actionLogs = [{
          isPlayer: false,
          text: "You lose 😷"
        }]
        this.isGameRunning = false
      } else if (this.covidHealth <= 0) {
        this.actionLogs = [{
          isPlayer: true,
          text: "You won 🎉"
        }]
        this.isGameRunning = false
      }
    },
    writteAction: function(isPlayerText, text) {
      this.actionLogs.unshift({
        isPlayer: isPlayerText,
        text: text
      })
    }
  }
})
