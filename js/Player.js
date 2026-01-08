// مشغل الفيديو - تحكم كامل
const video = document.getElementById('main-video');

// تشغيل/إيقاف
function playPause() {
    if (video.paused) {
        video.play();
        document.querySelector('.btn-control i.fa-play').className = 'fas fa-pause';
    } else {
        video.pause();
        document.querySelector('.btn-control i.fa-pause').className = 'fas fa-play';
    }
}

// كتم/إلغاء الكتم
function toggleMute() {
    video.muted = !video.muted;
    const icon = document.querySelector('.btn-control i.fa-volume-up');
    if (video.muted) {
        icon.className = 'fas fa-volume-mute';
    } else {
        icon.className = 'fas fa-volume-up';
    }
}

// ملء الشاشة
function fullScreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}

// تحكم في مستوى الصوت
const volumeSlider = document.getElementById('volume-slider');
if (volumeSlider) {
    volumeSlider.addEventListener('input', function() {
        video.volume = this.value;
        if (this.value == 0) {
            document.querySelector('.btn-control i.fa-volume-up').className = 'fas fa-volume-mute';
        } else {
            document.querySelector('.btn-control i.fa-volume-up').className = 'fas fa-volume-up';
        }
    });
}

// تحديث زر التشغيل تلقائيًا
video.addEventListener('play', function() {
    document.querySelector('.btn-control i.fa-play').className = 'fas fa-pause';
});

video.addEventListener('pause', function() {
    document.querySelector('.btn-control i.fa-play').className = 'fas fa-play';
});

// رسالة تأكيد عند مغادرة الصفحة أثناء التشغيل
window.addEventListener('beforeunload', function(e) {
    if (!video.paused) {
        e.preventDefault();
        e.returnValue = 'الفيديو لا يزال يعمل. هل تريد المغادرة؟';
    }
});

// تحميل الفيديو التلقائي عند فتح الصفحة (اختياري)
window.onload = function() {
    console.log('مشغل الفيديو جاهز!');
    // video.play(); // يمكن تفعيله إذا أردت التشغيل التلقائي
};
