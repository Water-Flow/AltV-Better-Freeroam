function colorify(e) {
    let t = [],
        n = null,
        o = 0;
    do {
        if (!(n = /\{[A-Fa-f0-9]{3}\}|\{[A-Fa-f0-9]{6}\}/g.exec(e.substr(o)))) break;
        t.push({
            found: n[0],
            index: n.index + o
        }), o = o + n.index + n[0].length
    } while (null != n);
    if (t.length > 0) {
        e += "</font>";
        for (let n = t.length - 1; n >= 0; --n) {
            let o = (0 != n ? "</font>" : "") + '<font color="#' + t[n].found.substring(1, t[n].found.length - 1) + '">';
            e = e.slice(0, t[n].index) + o + e.slice(t[n].index + t[n].found.length, e.length)
        }
    }
    return e
}
var timeout, chatOpened = !1,
    chatHighlighted = !1,
    buffer = [],
    currentBufferIndex = -1,
    messagesBlock = null,
    msgInputBlock = null,
    msgInputLine = null;

function fadeIn(e, t) {
    e.style.opacity = 0, e.style.display = "block";
    var n = +new Date,
        o = function() {
            e.style.opacity = (+new Date - n) / t, e.style.opacity < 1 && (window.requestAnimationFrame && requestAnimationFrame(o) || setTimeout(o, 16))
        };
    o()
}

function fadeOut(e, t) {
    e.style.opacity = 1;
    var n = +new Date,
        o = function() {
            e.style.opacity = 1 - (new Date - n) / t, +e.style.opacity > 0 && (window.requestAnimationFrame && requestAnimationFrame(o) || setTimeout(o, 16))
        };
    o()
}

function scrollTo(e, t, n) {
    if (n <= 0) e.scrollTop = t;
    else {
        var o = !1;
        t < e.scrollTop && (o = !0);
        var l = t - e.scrollTop,
            c = e.scrollTop,
            s = +new Date,
            i = function() {
                e.scrollTop = (o ? -e.scrollTop : e.scrollTop) + l * ((new Date - s) / n), e.scrollTop != c && (c = e.scrollTop, s = +new Date, (e.scrollTop < t && !o || e.scrollTop > t && o) && (window.requestAnimationFrame && requestAnimationFrame(i) || setTimeout(i, 16)))
            };
        i()
    }
}

function checkOverflow() {
    document.querySelector(".messages").clientHeight > document.querySelector(".msglist").clientHeight ? document.querySelector(".msglist").classList.contains("overflowed") || document.querySelector(".msglist").classList.add("overflowed") : document.querySelector(".msglist").classList.contains("overflowed") && document.querySelector(".msglist").classList.remove("overflowed")
}

function addString(e) {
    messagesBlock.children.length > 100 && messagesBlock.removeChild(messagesBlock.children[0]);
    var t = document.createElement("p");
    t.innerHTML = colorify(e), messagesBlock.appendChild(t), checkOverflow(), highlightChat()
}

function addMessage(e, t) {
    messagesBlock.children.length > 100 && messagesBlock.removeChild(messagesBlock.children[0]);
    var n = document.createElement("p");
    n.innerHTML = "<b>" + e + ": </b>" + colorify(t), messagesBlock.appendChild(n), checkOverflow(), highlightChat()
}

function saveBuffer() {
    buffer.length > 100 && buffer.pop(), buffer.unshift(msgInputLine.value), currentBufferIndex = -1
}

function loadBuffer(e) {
    msgInputLine.value = buffer[e]
}

function openChat(e) {
    if (e = e || !1, clearTimeout(timeout), chatOpened) return !1;
    document.querySelector(".chatbox").classList.add("active"), msgInputBlock.style.display = "block", msgInputBlock.style.opacity = 1, e && (msgInputLine.value = "/"), msgInputLine.focus(), chatOpened = !0
}

function closeChat() {
    if (!chatOpened) return !1;
    document.querySelector(".chatbox").classList.contains("active") && document.querySelector(".chatbox").classList.remove("active"), msgInputLine.blur(), msgInputBlock.style.display = "none", chatOpened = !1, msgInputLine.value = ""
}

function highlightChat() {
    scrollTo(document.querySelector(".msglist"), document.querySelector(".msglist").scrollHeight, 0), chatHighlighted || (document.querySelector(".chatbox").classList.add("active"), chatHighlighted = !0), clearTimeout(timeout), timeout = setTimeout(function() {
        document.querySelector(".chatbox").classList.contains("active") && document.querySelector(".chatbox").classList.remove("active"), chatHighlighted = !1
    }, 4e3)
}

function hideChat(e) {
    console.log("hideChat called"), document.querySelector(".content").style.display = e ? "none" : "block"
}
window.addEventListener("load", function() {
    messagesBlock = document.querySelector(".messages"), msgInputBlock = document.querySelector(".msginput"), msgInputLine = document.querySelector(".msginput input"), alt.emit("chatloaded")
}), document.querySelector("#message").addEventListener("submit", function(e) {
    e.preventDefault();
    var t = msgInputLine.value;
    alt.emit("chatmessage", t), saveBuffer(), msgInputLine.value = "", closeChat()
}), document.querySelector(".msginput input").addEventListener("keydown", function(e) {
    9 === e.keyCode ? e.preventDefault() : 40 == e.keyCode ? (e.preventDefault(), currentBufferIndex > 0 ? loadBuffer(--currentBufferIndex) : (currentBufferIndex = -1, msgInputLine.value = "")) : 38 == e.keyCode && (e.preventDefault(), currentBufferIndex < buffer.length - 1 && loadBuffer(++currentBufferIndex))
}), "alt" in window && (alt.on("addString", addString), alt.on("addMessage", addMessage), alt.on("openChat", openChat), alt.on("closeChat", closeChat), alt.on("hideChat", hideChat));