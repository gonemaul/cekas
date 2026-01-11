class AudioService {
  constructor() {
    this.sounds = {
      success: new Audio('/audio/success.wav'),
      wrong: new Audio('/audio/wrong.mp3'),
      tick: new Audio('/audio/tick.wav'),
      click: new Audio('/audio/click.wav'),
    }

    // Pre-load & Volume Settings
    Object.values(this.sounds).forEach((sound) => {
      sound.load()
      sound.volume = 0.5
    })
  }

  play(effect) {
    const sound = this.sounds[effect]
    if (sound) {
      // Reset waktu ke awal agar bisa diputar berkali-kali secara instan
      sound.currentTime = 0
      sound.play().catch((e) => console.warn('Audio play blocked by browser', e))
    }
  }

  // Khusus untuk suara detak jantung/waktu yang berulang
  playTick(shouldPlay) {
    if (shouldPlay) {
      this.sounds.tick.loop = true
      this.sounds.tick.play()
    } else {
      this.sounds.tick.pause()
      this.sounds.tick.currentTime = 0
    }
  }
}

export const audioService = new AudioService()
