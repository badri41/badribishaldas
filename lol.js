import init, { interact, verify } from './captcha.js?v=0.7.0'
let TOTAL_LEVELS = 9,
  DOMAIN = 'codeforces.com',
  VERSION = '0.7.0',
  INITIAL_TOKEN =
    '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',
  PRELOAD_IMAGES = [
    'static/images/level0.png',
    'static/images/level1.png',
    'static/images/level2.png',
    'static/images/level4.png',
    'static/images/level5.png',
    'static/images/level7.png',
    'static/images/level8.png'
  ],
  LOADING_MESSAGES = [
    'Verifying you are human. This may take a few seconds.',
    'Checking if the site connection is secure',
    'Performing security verification'
  ]
function getStored (e) {
  return localStorage.getItem(e)
}
function setStored (e, t) {
  localStorage.setItem(e, t)
}
getStored('version') !== VERSION &&
  (setStored('version', VERSION),
  setStored('current_level', '0'),
  setStored('current_token', INITIAL_TOKEN))
let currentLevel = parseInt(getStored('current_level') ?? '0', 10),
  currentToken = getStored('current_token') ?? INITIAL_TOKEN,
  $primaryMsg = document.getElementById('primary-message'),
  $secondaryMsg = document.getElementById('secondary-message'),
  $widget = document.getElementById('widget'),
  $wLoading = document.getElementById('widget-loading'),
  $wCheckbox = document.getElementById('widget-checkbox'),
  $wSuccess = document.getElementById('widget-success'),
  $puzzleCont = document.getElementById('puzzle-container'),
  $puzzleStatus = document.getElementById('puzzle-status-bar'),
  $puzzleTop = document.getElementById('puzzle-top-bar'),
  $puzzleArea = document.getElementById('puzzle-area'),
  $btnReset = document.getElementById('btn-reset'),
  $btnVerify = document.getElementById('btn-verify'),
  $verifyText = document.getElementById('verify-text'),
  $verifySpin = document.getElementById('verify-spinner'),
  $rayValue = document.getElementById('ray-id-value'),
  $aboutLink = document.getElementById('about-link'),
  $creditsDialog = document.getElementById('credits-dialog'),
  $privacyLink = document.getElementById('privacy-link'),
  $privacyDialog = document.getElementById('privacy-dialog')
function randomHex (e) {
  return Array.from(crypto.getRandomValues(new Uint8Array(e)))
    .map(e => e.toString(16).padStart(2, '0'))
    .join('')
}
function showOnly (e, ...t) {
  t.forEach(e => {
    e.classList.add('hidden')
  }),
    e.classList.remove('hidden')
}
function allLevelsComplete () {
  return currentLevel >= TOTAL_LEVELS
}
function renderLevel0 () {
  ;($puzzleTop.innerHTML =
    'Select all squares containing a <span class="puzzle-top-highlight">stop sign</span>'),
    ($puzzleArea.innerHTML = '')
  let o = document.createElement('div'),
    d = ((o.className = 'grid-4x4'), new Image())
  ;(d.src = 'static/images/level0.png'),
    (d.crossOrigin = 'anonymous'),
    (d.onload = () => {
      o.innerHTML = ''
      var n = d.naturalWidth / 4,
        l = d.naturalHeight / 4
      for (let t = 0; t < 16; t++) {
        let e = document.createElement('div')
        ;(e.className = 'grid-cell'), (e.dataset.index = t)
        var r = document.createElement('canvas'),
          a = ((r.width = n), (r.height = l), r.getContext('2d')),
          i = t % 4,
          s = Math.floor(t / 4),
          a =
            (a.drawImage(d, i * n, s * l, n, l, 0, 0, n, l),
            document.createElement('img'))
        ;(a.src = r.toDataURL()),
          e.appendChild(a),
          e.addEventListener('click', () => e.classList.toggle('selected')),
          o.appendChild(e)
      }
    }),
    $puzzleArea.appendChild(o)
}
function getLevel0Solution () {
  var e = $puzzleArea.querySelectorAll('.grid-cell')
  return Array.from(e)
    .map(e => (e.classList.contains('selected') ? '1' : '0'))
    .join('')
}
function renderLevel1 () {
  ;($puzzleTop.textContent = 'Type the text in the image'),
    ($puzzleArea.innerHTML = '')
  var e = document.createElement('div'),
    t = ((e.className = 'level1-wrap'), document.createElement('img')),
    t =
      ((t.src = 'static/images/level1.png'),
      e.appendChild(t),
      document.createElement('input'))
  ;(t.type = 'text'),
    (t.id = 'level1-input'),
    (t.placeholder = 'Type here...'),
    (t.autocomplete = 'off'),
    t.addEventListener('keydown', e => {
      'Enter' === e.key && handleVerify()
    }),
    e.appendChild(t),
    $puzzleArea.appendChild(e)
}
function getLevel1Solution () {
  var e = document.getElementById('level1-input')
  return e ? e.value : ''
}
function renderLevel2 () {
  ;($puzzleTop.innerHTML =
    'Click on all <span class="puzzle-top-highlight">composite numbers</span>'),
    ($puzzleArea.innerHTML = '')
  let l = document.createElement('div')
  l.className = 'level2-wrap'
  var e = document.createElement('img')
  ;(e.src = 'static/images/level2.png'),
    l.appendChild(e),
    l.addEventListener('click', e => {
      var t, n
      e.target.classList.contains('click-marker')
        ? e.target.remove()
        : ((n = l.getBoundingClientRect()),
          (t = ((e.clientX - n.left) / n.width) * 100),
          (e = ((e.clientY - n.top) / n.height) * 100),
          ((n = document.createElement('div')).className = 'click-marker'),
          (n.style.left = t + '%'),
          (n.style.top = e + '%'),
          l.appendChild(n))
    }),
    $puzzleArea.appendChild(l)
}
function getLevel2Solution () {
  var e = $puzzleArea.querySelectorAll('.click-marker')
  return Array.from(e)
    .map(e => {
      var t = parseFloat(e.style.left),
        e = parseFloat(e.style.top)
      return t.toFixed(2) + ',' + e.toFixed(2)
    })
    .join(';')
}
let level3Guesses = []
function renderLevel3 () {
  ;($puzzleTop.innerHTML =
    'Finish the <span class="puzzle-top-highlight">Wordle</span>'),
    ($puzzleArea.innerHTML = ''),
    (level3Guesses = [])
  var e = document.createElement('div')
  e.className = 'wordle-wrap'
  let a = document.createElement('div')
  ;(a.className = 'wordle-board'), (a.id = 'wordle-board'), e.appendChild(a)
  var t = document.createElement('div')
  t.className = 'wordle-input-row'
  let i = document.createElement('input'),
    s =
      ((i.type = 'text'),
      (i.id = 'wordle-input'),
      (i.maxLength = 5),
      (i.placeholder = 'Enter 5-letter word'),
      (i.autocomplete = 'off'),
      t.appendChild(i),
      document.createElement('button'))
  ;(s.type = 'button'),
    (s.id = 'wordle-guess'),
    (s.textContent = 'Guess'),
    (s.disabled = !0),
    t.appendChild(s),
    e.appendChild(t),
    $puzzleArea.appendChild(e),
    i.addEventListener('input', () => {
      s.disabled = 5 !== i.value.length
    }),
    s.addEventListener('click', () => {
      var t = i.value.toUpperCase()
      if (5 === t.length) {
        var n = interact(3, t)
        if (void 0 !== n) {
          level3Guesses.push(t)
          var l = document.createElement('div')
          l.className = 'wordle-row'
          for (let e = 0; e < 5; e++) {
            var r = document.createElement('div')
            ;(r.className = 'wordle-tile tile-' + n[e]),
              (r.textContent = t[e]),
              l.appendChild(r)
          }
          a.appendChild(l),
            (i.value = ''),
            (s.disabled = !0),
            i.focus(),
            'GGGGG' === n &&
              document
                .querySelector('.wordle-input-row')
                .classList.add('hidden')
        }
      }
    }),
    i.addEventListener('keydown', e => {
      'Enter' !== e.key || s.disabled || s.click()
    })
}
function getLevel3Solution () {
  return 0 < level3Guesses.length ? level3Guesses[level3Guesses.length - 1] : ''
}
function renderLevel4 () {
  ;($puzzleTop.innerHTML =
    'Select all <span class="puzzle-top-highlight">unrated rounds</span>'),
    ($puzzleArea.innerHTML = '')
  let a = document.createElement('div'),
    i = ((a.className = 'grid-8x1'), new Image()),
    s =
      ((i.src = 'static/images/level4.png'),
      (i.crossOrigin = 'anonymous'),
      [0, 71, 153, 233, 297, 375, 472, 534, 640])
  ;(i.onload = () => {
    a.innerHTML = ''
    var n = i.naturalWidth
    for (let t = 0; t < 8; t++) {
      let e = document.createElement('div')
      ;(e.className = 'grid-cell'), (e.dataset.index = t)
      var l = document.createElement('canvas')
      ;(l.width = n), (l.height = s[t + 1] - s[t])
      l.getContext('2d').drawImage(
        i,
        0,
        s[t],
        n,
        s[t + 1] - s[t],
        0,
        0,
        n,
        s[t + 1] - s[t]
      )
      var r = document.createElement('img')
      ;(r.src = l.toDataURL()),
        e.appendChild(r),
        e.addEventListener('click', () => e.classList.toggle('selected')),
        a.appendChild(e)
    }
  }),
    $puzzleArea.appendChild(a)
}
function getLevel4Solution () {
  var e = $puzzleArea.querySelectorAll('.grid-cell')
  return Array.from(e)
    .map(e => (e.classList.contains('selected') ? '1' : '0'))
    .join('')
}
function renderLevel5 () {
  ;($puzzleTop.innerHTML =
    'Select all squares containing <span class="puzzle-top-highlight">the letter R</span>'),
    ($puzzleArea.innerHTML = '')
  let i = document.createElement('div'),
    s = ((i.className = 'grid-1x10'), new Image())
  ;(s.src = 'static/images/level5.png'),
    (s.crossOrigin = 'anonymous'),
    (s.onload = () => {
      i.innerHTML = ''
      var n = s.naturalWidth / 10,
        l = s.naturalHeight
      for (let t = 0; t < 10; t++) {
        let e = document.createElement('div')
        ;(e.className = 'grid-cell'), (e.dataset.index = t)
        var r = document.createElement('canvas')
        ;(r.width = n), (r.height = l)
        r.getContext('2d').drawImage(s, t * n, 0, n, l, 0, 0, n, l)
        var a = document.createElement('img')
        ;(a.src = r.toDataURL()),
          e.appendChild(a),
          e.addEventListener('click', () => e.classList.toggle('selected')),
          i.appendChild(e)
      }
    }),
    $puzzleArea.appendChild(i)
}
function getLevel5Solution () {
  var e = $puzzleArea.querySelectorAll('.grid-cell')
  return Array.from(e)
    .map(e => (e.classList.contains('selected') ? '1' : '0'))
    .join('')
}
let LEVEL6_LINES = [
  '}',
  '    for (int j = 0; j < n; j++) {',
  '        }',
  '        for (int k = 0; k < n; k++) {',
  'for (int i = 0; i < n; i++) {',
  '    }',
  '            d[i][j] = min(d[i][j], d[i][k] + d[k][j]);'
]
function renderLevel6 () {
  ;($puzzleTop.innerHTML =
    'Find all <span class="puzzle-top-highlight">shortest paths</span>'),
    ($puzzleArea.innerHTML = '')
  let l = document.createElement('div')
  l.className = 'code-reorder'
  var e,
    t = Array.from({ length: LEVEL6_LINES.length }, (e, t) => t)
  for (let e = t.length - 1; 0 < e; e--) {
    var n = Math.floor(Math.random() * (e + 1))
    ;[t[e], t[n]] = [t[n], t[e]]
  }
  let r = null,
    a = null,
    i = null,
    s = 0,
    o = 0,
    d = null
  for (e of t)
    l.appendChild(
      (e => {
        let n = document.createElement('div')
        ;(n.className = 'code-line'),
          (n.draggable = !0),
          (n.dataset.origIndex = e)
        var t = document.createElement('span')
        return (
          (t.className = 'drag-grip'),
          (t.textContent = 'â ¿'),
          n.appendChild(t),
          ((t = document.createElement('code')).textContent = LEVEL6_LINES[e]),
          n.appendChild(t),
          n.addEventListener('dragstart', e => {
            ;(r = n).classList.add('dragging'),
              (e.dataTransfer.effectAllowed = 'move')
          }),
          n.addEventListener('dragend', () => {
            n.classList.remove('dragging'),
              l
                .querySelectorAll('.code-line')
                .forEach(e => e.classList.remove('drag-over'))
          }),
          n.addEventListener('dragover', e => {
            e.preventDefault(),
              (e.dataTransfer.dropEffect = 'move'),
              n !== r && n.classList.add('drag-over')
          }),
          n.addEventListener('dragleave', () => {
            n.classList.remove('drag-over')
          }),
          n.addEventListener('drop', e => {
            e.preventDefault(),
              n.classList.remove('drag-over'),
              r &&
                r !== n &&
                ((e = [...l.children]).indexOf(r) < e.indexOf(n)
                  ? l.insertBefore(r, n.nextSibling)
                  : l.insertBefore(r, n))
          }),
          n.addEventListener(
            'touchstart',
            e => {
              var e = e.touches[0],
                t = (a = n).getBoundingClientRect()
              ;(s = e.clientX - t.left),
                (o = e.clientY - t.top),
                (i = n.cloneNode(!0)).classList.add('touch-dragging'),
                (i.style.position = 'fixed'),
                (i.style.width = t.width + 'px'),
                (i.style.zIndex = '9999'),
                (i.style.pointerEvents = 'none'),
                (i.style.left = e.clientX - s + 'px'),
                (i.style.top = e.clientY - o + 'px'),
                document.body.appendChild(i),
                n.classList.add('dragging')
            },
            { passive: !0 }
          ),
          n.addEventListener(
            'touchmove',
            e => {
              a &&
                (e.preventDefault(),
                (e = e.touches[0]),
                i &&
                  ((i.style.left = e.clientX - s + 'px'),
                  (i.style.top = e.clientY - o + 'px')),
                i && i.classList.add('hidden'),
                (e = document.elementFromPoint(e.clientX, e.clientY)),
                i && i.classList.remove('hidden'),
                (e = e ? e.closest('.code-line') : null),
                d && d !== e && d.classList.remove('drag-over'),
                (d =
                  e && e !== a && l.contains(e)
                    ? (e.classList.add('drag-over'), e)
                    : null))
            },
            { passive: !1 }
          ),
          n.addEventListener('touchend', () => {
            var e
            a &&
              (d &&
                d !== a &&
                ((e = [...l.querySelectorAll('.code-line')]).indexOf(a) <
                e.indexOf(d)
                  ? l.insertBefore(a, d.nextSibling)
                  : l.insertBefore(a, d),
                d.classList.remove('drag-over')),
              a.classList.remove('dragging'),
              i && i.parentNode && i.parentNode.removeChild(i),
              (a = null),
              (i = null),
              (d = null))
          }),
          n
        )
      })(e)
    )
  var c = document.createElement('p')
  ;(c.className = 'code-reorder-hint'),
    (c.textContent = 'Drag and drop to reorder lines'),
    l.appendChild(c),
    $puzzleArea.appendChild(l)
}
function getLevel6Solution () {
  var e = $puzzleArea.querySelectorAll('.code-line')
  return Array.from(e)
    .map(e => e.dataset.origIndex)
    .join('')
}
let MS_SPRITE_MINE = 0,
  MS_SPRITE_UNCLICKED = 1,
  MS_SPRITE_FLAGGED = 2,
  level7Seed = 0,
  level7Actions = [],
  level7Width = 0,
  level7Height = 0,
  level7State = null,
  level7SpriteImg = null,
  level7Wrap = null
function level7BuildInput () {
  var e,
    t,
    n,
    l = [level7Seed]
  for ([e, t, n] of level7Actions) l.push(e, t, n)
  return l.join(',')
}
function level7CallInteract () {
  var e = interact(7, level7BuildInput())
  return void 0 === e
    ? null
    : ((level7State = JSON.parse(e)),
      (level7Width = level7State.width),
      (level7Height = level7State.height),
      level7State)
}
function level7RenderBoard () {
  let l = level7Wrap.querySelector('.minesweeper-grid')
  l ||
    (((l = document.createElement('div')).className = 'minesweeper-grid'),
    level7Wrap.insertBefore(l, level7Wrap.firstChild)),
    (l.style.gridTemplateColumns = `repeat(${level7Width}, 1fr)`),
    (l.innerHTML = '')
  var e = level7State,
    r = e.board
  for (let n = 0; n < level7Height; n++)
    for (let t = 0; t < level7Width; t++) {
      var a = r[n * level7Width + t]
      let e
      switch (a) {
        case '.':
          e = MS_SPRITE_UNCLICKED
          break
        case 'F':
          e = MS_SPRITE_FLAGGED
          break
        case 'M':
          e = MS_SPRITE_MINE
          break
        default:
          e = 3 + parseInt(a, 10)
      }
      var i = document.createElement('div'),
        s =
          ((i.className = 'ms-cell'),
          (i.dataset.row = n),
          (i.dataset.col = t),
          (i.dataset.ch = a),
          document.createElement('canvas')),
        o = ((s.width = 32), (s.height = 32), s.getContext('2d'))
      level7SpriteImg &&
        level7SpriteImg.complete &&
        o.drawImage(level7SpriteImg, 32 * e, 0, 32, 32, 0, 0, 32, 32),
        i.appendChild(s),
        l.appendChild(i)
    }
  var t = level7Wrap.querySelector('.ms-hint')
  t ||
    (((t = document.createElement('div')).className = 'ms-hint'),
    (t.innerHTML =
      'Left click to reveal tile, right click (long press on mobile) to place flag'),
    level7Wrap.appendChild(t))
  let n = level7Wrap.querySelector('.ms-info')
  n ||
    (((n = document.createElement('div')).className = 'ms-info'),
    level7Wrap.appendChild(n)),
    e.is_lost
      ? (n.innerHTML = '<span class="ms-exploded">Exploded!</span>')
      : 0 === e.safe_cells_remaining
      ? (n.innerHTML = '<span class="ms-win">All safe cells cleared!</span>')
      : (n.innerHTML =
          `<span>Mines remaining: <strong>${e.mines_remaining}</strong></span>` +
          ' Â· ' +
          `<span>Safe cells: <strong>${e.safe_cells_remaining}</strong></span>`)
}
function level7HandleClick (e) {
  if (
    level7State &&
    !level7State.is_lost &&
    0 !== level7State.safe_cells_remaining
  ) {
    var t = e.target.closest('.ms-cell')
    if (t) {
      var n = parseInt(t.dataset.row, 10),
        l = parseInt(t.dataset.col, 10),
        t = t.dataset.ch
      if ('contextmenu' === e.type) {
        if ('.' !== t && 'F' !== t) return
        level7Actions.push([1, n, l])
      } else {
        if ('.' !== t) return
        level7Actions.push([0, n, l])
      }
      level7CallInteract(), level7RenderBoard()
    }
  }
}
function renderLevel7 () {
  ;($puzzleTop.innerHTML =
    'Clear the <span class="puzzle-top-highlight">minefield</span>'),
    ($puzzleArea.innerHTML = ''),
    (level7Seed = Math.floor(4294967296 * Math.random())),
    (level7Actions = []),
    ((level7Wrap = document.createElement('div')).className =
      'minesweeper-wrap'),
    $puzzleArea.appendChild(level7Wrap),
    level7Wrap.addEventListener('click', level7HandleClick),
    level7Wrap.addEventListener('contextmenu', e => {
      e.preventDefault(), level7HandleClick(e)
    }),
    ((level7SpriteImg = new Image()).src = 'static/images/level7.png'),
    (level7SpriteImg.crossOrigin = 'anonymous'),
    level7CallInteract(),
    (level7SpriteImg.onload = () => {
      level7RenderBoard()
    })
}
function getLevel7Solution () {
  return level7BuildInput()
}
function renderLevel8 () {
  ;($puzzleTop.innerHTML =
    'Click on <span class="puzzle-top-highlight">Liechtenstein</span>'),
    ($puzzleArea.innerHTML = '')
  let l = document.createElement('div')
  l.className = 'level8-wrap'
  var e = document.createElement('img')
  ;(e.src = 'static/images/level8.png'),
    l.appendChild(e),
    l.addEventListener('click', e => {
      var t, n
      e.target.classList.contains('level8-marker') ||
        ((n = l.getBoundingClientRect()),
        (t = ((e.clientX - n.left) / n.width) * 100),
        (e = ((e.clientY - n.top) / n.height) * 100),
        (n = l.querySelector('.level8-marker')) && n.remove(),
        ((n = document.createElement('div')).className = 'level8-marker'),
        (n.style.left = t + '%'),
        (n.style.top = e + '%'),
        l.appendChild(n))
    }),
    $puzzleArea.appendChild(l)
}
function getLevel8Solution () {
  var e,
    t = $puzzleArea.querySelector('.level8-marker')
  return t
    ? ((e = parseFloat(t.style.left)),
      (t = parseFloat(t.style.top)),
      e.toFixed(2) + ',' + t.toFixed(2))
    : ''
}
let levelRenderers = [
    renderLevel0,
    renderLevel1,
    renderLevel2,
    renderLevel3,
    renderLevel4,
    renderLevel5,
    renderLevel6,
    renderLevel7,
    renderLevel8
  ],
  solutionGetters = [
    getLevel0Solution,
    getLevel1Solution,
    getLevel2Solution,
    getLevel3Solution,
    getLevel4Solution,
    getLevel5Solution,
    getLevel6Solution,
    getLevel7Solution,
    getLevel8Solution
  ]
function renderCurrentLevel () {
  currentLevel < TOTAL_LEVELS && levelRenderers[currentLevel]()
}
function getCurrentSolution () {
  return currentLevel < TOTAL_LEVELS ? solutionGetters[currentLevel]() : ''
}
function showPuzzle () {
  $widget.classList.add('hidden'),
    $puzzleStatus.classList.add('hidden'),
    ($puzzleStatus.className = 'hidden'),
    ($puzzleStatus.textContent = ''),
    $puzzleCont.classList.remove('hidden'),
    setButtonsEnabled(!0),
    renderCurrentLevel()
}
async function showFinalSuccess (e) {
  $widget.classList.remove('hidden'),
    showOnly($wSuccess, $wLoading, $wCheckbox, $wSuccess),
    $puzzleCont.classList.add('hidden'),
    ($primaryMsg.textContent = `Verification successful. Waiting for ${DOMAIN} to respond...`),
    await new Promise(e => setTimeout(e, 1e3 * Math.random() + 1500))
  try {
    var t = Uint8Array.from(atob(e), e => e.charCodeAt(0)),
      n = t.slice(0, 12),
      l = t.slice(12, 44),
      r = t.slice(44),
      a = await crypto.subtle.importKey('raw', l, { name: 'AES-GCM' }, !1, [
        'decrypt'
      ]),
      i = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: n }, a, r),
      s = new TextDecoder().decode(i),
      o =
        ((document.getElementById('main-content').innerHTML = s),
        document.getElementById('page-footer').classList.add('hidden'),
        document.getElementById('restart-link'))
    o &&
      o.addEventListener('click', e => {
        e.preventDefault(),
          setStored('current_level', '0'),
          setStored('current_token', INITIAL_TOKEN),
          location.reload()
      })
  } catch (e) {
    console.error('Decryption failed:', e),
      $widget.classList.remove('hidden'),
      showOnly($wSuccess, $wLoading, $wCheckbox, $wSuccess),
      $puzzleCont.classList.add('hidden'),
      ($primaryMsg.textContent = `Verification successful. Waiting for ${DOMAIN} to respond...`),
      ($secondaryMsg.textContent = 'Error: could not decrypt win screen.')
  }
}
function setButtonsEnabled (e) {
  ;($btnReset.disabled = !e),
    ($btnVerify.disabled = !e),
    ($verifyText.textContent = e ? 'Verify' : 'Verifying...'),
    $verifySpin.classList.toggle('hidden', e)
}
async function handleVerify () {
  setButtonsEnabled(!1)
  var e = getCurrentSolution(),
    [, e] = await Promise.all([
      new Promise(e => setTimeout(e, 750)),
      Promise.resolve(verify(currentLevel, e, currentToken))
    ])
  void 0 !== e
    ? (currentLevel++,
      (currentToken = e),
      setStored('current_level', currentLevel),
      setStored('current_token', currentToken),
      allLevelsComplete()
        ? await showFinalSuccess(currentToken)
        : (($puzzleStatus.textContent = 'Additional verification required.'),
          ($puzzleStatus.className = 'success'),
          setButtonsEnabled(!0),
          renderCurrentLevel()))
    : (($puzzleStatus.textContent = 'Verification failed. Please try again.'),
      ($puzzleStatus.className = 'error'),
      setButtonsEnabled(!0))
}
function preloadImages () {
  return Promise.all(
    PRELOAD_IMAGES.map(
      n =>
        new Promise(e => {
          var t = new Image()
          ;(t.onload = e), (t.onerror = e), (t.src = n)
        })
    )
  )
}
async function main () {
  ;($rayValue.textContent = randomHex(8)),
    (document.querySelector('.banner-site').textContent = DOMAIN),
    ($secondaryMsg.textContent =
      DOMAIN +
      ' needs to review the security of your connection before proceeding.'),
    $aboutLink.addEventListener('click', e => {
      e.preventDefault(), $creditsDialog.showModal()
    }),
    $privacyLink.addEventListener('click', e => {
      e.preventDefault(), $privacyDialog.showModal()
    })
  try {
    await init()
  } catch (e) {
    return (
      console.error(e),
      void (document.body.innerHTML =
        '<div class="noscript-error">Failed to load the verification module. Please make sure your browser supports WebAssembly.</div>')
    )
  }
  document.getElementById('main-content').classList.remove('hidden'),
    document.getElementById('page-footer').classList.remove('hidden'),
    ($primaryMsg.textContent =
      LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]),
    await Promise.all([
      new Promise(e => setTimeout(e, 5e3 * Math.random() + 5e3)),
      preloadImages()
    ]),
    allLevelsComplete()
      ? await showFinalSuccess(currentToken)
      : (showOnly($wCheckbox, $wLoading, $wCheckbox, $wSuccess),
        ($primaryMsg.textContent =
          'Verify you are human by completing the action below.'),
        document
          .getElementById('checkbox-label')
          .addEventListener('click', () => {
            showPuzzle()
          }),
        $btnVerify.addEventListener('click', handleVerify),
        $btnReset.addEventListener('click', () => {
          $puzzleStatus.classList.add('hidden'),
            ($puzzleStatus.className = 'hidden'),
            ($puzzleStatus.textContent = ''),
            renderCurrentLevel()
        }))
}
main()
