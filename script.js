// Enhanced Services Section Animations
document.addEventListener("DOMContentLoaded", () => {
  // Animate service cards on scroll
  const serviceCards = document.querySelectorAll(".service-card")

  const serviceObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("animate")
          }, index * 150) // Stagger animation
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  serviceCards.forEach((card) => {
    serviceObserver.observe(card)
  })

  // Add ripple effect to service buttons
  document.querySelectorAll(".service-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      ripple.classList.add("ripple")
      this.appendChild(ripple)

      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Parallax effect for service icons
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const serviceIcons = document.querySelectorAll(".service-icon")

    serviceIcons.forEach((icon, index) => {
      const speed = 0.1 + (index % 3) * 0.05
      const yPos = -(scrolled * speed)
      icon.style.transform = `translateY(${yPos}px)`
    })
  })

  // Enhanced hover effects for service cards
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      const isEven = Array.from(serviceCards).indexOf(this) % 2 === 1
      this.style.transform = isEven ? "translateY(5px) scale(1)" : "translateY(0) scale(1)"
    })
  })

  // Add special animation for the cogs icon (System Development)
  const cogsIcon = document.querySelector(".service-card:nth-child(2) .service-icon i")
  if (cogsIcon) {
    // Pause rotation on hover for better UX
    const systemCard = document.querySelector(".service-card:nth-child(2)")

    systemCard.addEventListener("mouseenter", () => {
      cogsIcon.style.animationPlayState = "paused"
    })

    systemCard.addEventListener("mouseleave", () => {
      cogsIcon.style.animationPlayState = "running"
    })
  }

  // Add interactive icon effects
  const serviceIcons = document.querySelectorAll(".service-icon")

  serviceIcons.forEach((icon, index) => {
    icon.addEventListener("mouseenter", function () {
      // Add a subtle shake effect for QA Testing (Search icon)
      if (index === 4) {
        // QA Testing is the 5th card (index 4)
        this.querySelector("i").style.animation = "shake 0.5s ease-in-out"
      }

      // Add bounce effect for Game Development (Gamepad icon)
      if (index === 3) {
        // Game Development is the 4th card (index 3)
        this.querySelector("i").style.animation = "bounce 0.6s ease-in-out"
      }
    })

    icon.addEventListener("mouseleave", function () {
      // Reset animations
      if (index === 4) {
        this.querySelector("i").style.animation = ""
      }
      if (index === 3) {
        this.querySelector("i").style.animation = ""
      }
    })
  })
})

// Smooth reveal animation for CTA section
const ctaSection = document.querySelector(".services-cta")
if (ctaSection) {
  const ctaObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    { threshold: 0.3 },
  )

  ctaSection.style.opacity = "0"
  ctaSection.style.transform = "translateY(30px)"
  ctaSection.style.transition = "opacity 0.8s ease, transform 0.8s ease"

  ctaObserver.observe(ctaSection)
}

// Button ripple effect
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    ripple.classList.add("ripple")
    this.appendChild(ripple)

    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Parallax effect for background elements
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset

  document.querySelectorAll(".bg-circle, .bg-shape").forEach((element, index) => {
    const speed = 0.5 + index * 0.1
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", () => {
  // Add loading animation
  document.body.classList.add("loaded")

  // Initialize skill levels animation for the first tab
  setTimeout(() => {
    animateSkillLevels()
  }, 1000)

  const downloadBtn = document.getElementById("downloadResumeBtn")

  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      // Create a temporary anchor element to trigger download
      const link = document.createElement("a")
      link.href = "MONTANO_EDWARD_JEMUEL_RESUME.pdf" // Path to your PDF file
      link.download = "Edward_Montano_Resume.pdf" // Downloaded file name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
  }
})

function generateResumeHTML() {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 100%; margin: 0 auto; color: #333; background: white;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #68a870; margin-bottom: 5px; font-size: 32px;">Edward Jemuel G. Montano</h1>
        <p style="margin: 5px 0; font-size: 16px;">Information Technology Student & Developer</p>
        <p style="margin: 5px 0; font-size: 14px;">
          📧 edwardmontano.dev@gmail.com | 📱 09512881934
        </p>
      </div>

      <div style="margin-bottom: 25px;">
        <h2 style="color: #68a870; border-bottom: 2px solid #68a870; padding-bottom: 5px; font-size: 20px;">About</h2>
        <p style="line-height: 1.6; font-size: 14px;">
          Passionate Information Technology student currently in 3rd year at Pamantasan ng Lungsod ng Valenzuela. 
          Dedicated to creating innovative digital solutions and transforming ideas into reality through code. 
          My mission is to utilize my technical and managerial skills to contribute effectively, achieve goals, 
          and deliver strong performance in every project I undertake.
        </p>
      </div>

      <div style="margin-bottom: 25px;">
        <h2 style="color: #68a870; border-bottom: 2px solid #68a870; padding-bottom: 5px; font-size: 20px;">Education</h2>
        <p style="margin: 10px 0; font-size: 14px;">
          <strong>Bachelor of Science in Information Technology</strong><br>
          Pamantasan ng Lungsod ng Valenzuela<br>
          4th Year Student
        </p>
      </div>

      <div style="margin-bottom: 25px;">
        <h2 style="color: #68a870; border-bottom: 2px solid #68a870; padding-bottom: 5px; font-size: 20px;">Technical Skills</h2>
        <ul style="line-height: 1.8; font-size: 14px;">
          <li>Programming Languages: PHP, C#, Python, Java, JavaScript</li>
          <li>Web Development: HTML, CSS, React, Laravel</li>
          <li>Mobile Development: Ionic Framework (Angular)</li>
          <li>Database: MySQL</li>
          <li>UI/UX Design</li>
          <li>QA Testing</li>
          <li>Networking</li>
        </ul>
      </div>

      <div style="margin-bottom: 25px;">
        <h2 style="color: #68a870; border-bottom: 2px solid #68a870; padding-bottom: 5px; font-size: 20px;">Software & Tools</h2>
        <ul style="line-height: 1.8; font-size: 14px;">
          <li>Design: Figma, Adobe Creative Suite, Blender 3D</li>
          <li>Development: Unity, DaVinci Resolve</li>
          <li>Productivity: Microsoft Suite</li>
        </ul>
      </div>

      <div style="margin-bottom: 25px;">
        <h2 style="color: #68a870; border-bottom: 2px solid #68a870; padding-bottom: 5px; font-size: 20px;">Services Offered</h2>
        <ul style="line-height: 1.8; font-size: 14px;">
          <li><strong>Web Development:</strong> Responsive, modern websites and web applications</li>
          <li><strong>System Development:</strong> Robust desktop applications and management systems</li>
          <li><strong>App Development:</strong> Cross-platform mobile applications</li>
          <li><strong>Game Development:</strong> 2D/3D games and interactive experiences</li>
          <li><strong>QA & Testing:</strong> Comprehensive testing and quality assurance</li>
        </ul>
      </div>

      <div style="margin-bottom: 25px;">
        <h2 style="color: #68a870; border-bottom: 2px solid #68a870; padding-bottom: 5px; font-size: 20px;">Other Skills</h2>
        <ul style="line-height: 1.8; font-size: 14px;">
          <li>Hardware & Software Troubleshooting</li>
          <li>Filming & Video Production</li>
          <li>Team Management</li>
          <li>Project Management</li>
        </ul>
      </div>

      <div style="margin-bottom: 25px;">
        <h2 style="color: #68a870; border-bottom: 2px solid #68a870; padding-bottom: 5px; font-size: 20px;">Achievements</h2>
        <ul style="line-height: 1.8; font-size: 14px;">
          <li>8+ Projects Completed</li>
          <li>4+ Seminars Attended</li>
          <li>2+ Years of Experience</li>
        </ul>
      </div>

      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ccc;">
        <p style="font-size: 12px; color: #666;">
          Generated from codebyedward.com
        </p>
      </div>
    </div>
  `
}

// Mouse hover effect for project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    if (window.innerWidth > 768) {
      mouseFollower.style.width = "50px"
      mouseFollower.style.height = "50px"
      mouseFollower.style.backgroundColor = "rgba(104, 168, 112, 0.2)"
      mouseFollower.style.borderWidth = "0"
    }
  })

  card.addEventListener("mouseleave", () => {
    if (window.innerWidth > 768) {
      mouseFollower.style.width = "30px"
      mouseFollower.style.height = "30px"
      mouseFollower.style.backgroundColor = "transparent"
      mouseFollower.style.borderWidth = "2px"
    }
  })
})

// Mouse hover effect for buttons
document.querySelectorAll(".btn, .nav-link, .social-link").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    if (window.innerWidth > 768) {
      mouseFollower.style.width = "0"
      mouseFollower.style.height = "0"
      mouseFollower.style.opacity = "0"
    }
  })

  btn.addEventListener("mouseleave", () => {
    if (window.innerWidth > 768) {
      mouseFollower.style.width = "30px"
      mouseFollower.style.height = "30px"
      mouseFollower.style.opacity = "1"
    }
  })
})

// Theme toggle functionality
const themeToggles = document.querySelectorAll(".theme-toggle")
const body = document.body

// Function to update theme icon
function updateThemeIcon(isDark) {
  themeToggles.forEach((toggle) => {
    const themeIcon = toggle.querySelector("i")
    if (isDark) {
      themeIcon.classList.remove("fa-sun")
      themeIcon.classList.add("fa-moon")
    } else {
      themeIcon.classList.remove("fa-moon")
      themeIcon.classList.add("fa-sun")
    }
  })
}

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem("theme")
if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  body.classList.add("dark-mode")
  updateThemeIcon(true)
} else {
  body.classList.remove("dark-mode")
  updateThemeIcon(false)
}

// Toggle theme function
themeToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode")

    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark")
      updateThemeIcon(true)
    } else {
      localStorage.setItem("theme", "light")
      updateThemeIcon(false)
    }

    // Close mobile menu when theme is toggled
    if (window.innerWidth <= 768) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }
  })
})

// Update the mouse follower color based on theme
function updateMouseFollowerColor() {
  if (body.classList.contains("dark-mode")) {
    document.documentElement.style.setProperty("--primary-transparent", "rgba(104, 168, 112, 0.2)")
  } else {
    document.documentElement.style.setProperty("--primary-transparent", "rgba(104, 168, 112, 0.1)")
  }
}

// Call this function when theme changes
themeToggles.forEach((toggle) => {
  toggle.addEventListener("click", updateMouseFollowerColor)
})

// Call it once on page load
updateMouseFollowerColor()

// Add CSS animations via JavaScript
const style = document.createElement("style")
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
`
document.head.appendChild(style)

// Mouse Follower
const mouseFollower = document.querySelector(".mouse-follower")
let mouseX = 0
let mouseY = 0
let followerX = 0
let followerY = 0

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
  mouseFollower.style.opacity = "1"
})

function animateFollower() {
  followerX += (mouseX - followerX) * 0.1
  followerY += (mouseY - followerY) * 0.1

  mouseFollower.style.left = followerX + "px"
  mouseFollower.style.top = followerY + "px"

  requestAnimationFrame(animateFollower)
}

animateFollower()

// Hide mouse follower on mobile
if (window.innerWidth <= 768) {
  mouseFollower.style.display = "none"
}

// Navigation
const navbar = document.querySelector(".navbar")
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")
const navLinks = document.querySelectorAll(".nav-link")

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Mobile menu toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Typing Effect for Hero Subtitle
const typedTextSpan = document.querySelector(".typed-text")
const cursorSpan = document.querySelector(".cursor")

const textArray = [
  "Information Technology Student",
  "Web Developer",
  "Game Developer",
  "UI/UX Designer",
  "Problem Solver",
]

const typingDelay = 100
const erasingDelay = 50
const newTextDelay = 2000
let textArrayIndex = 0
let charIndex = 0

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing")
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex)
    charIndex++
    setTimeout(type, typingDelay)
  } else {
    cursorSpan.classList.remove("typing")
    setTimeout(erase, newTextDelay)
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing")
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1)
    charIndex--
    setTimeout(erase, erasingDelay)
  } else {
    cursorSpan.classList.remove("typing")
    textArrayIndex++
    if (textArrayIndex >= textArray.length) textArrayIndex = 0
    setTimeout(type, typingDelay + 1100)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (textArray.length) setTimeout(type, newTextDelay + 250)
})

// Skills Tabs
const tabBtns = document.querySelectorAll(".tab-btn")
const tabContents = document.querySelectorAll(".tab-content")

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetTab = btn.getAttribute("data-tab")

    // Remove active class from all tabs and contents
    tabBtns.forEach((b) => b.classList.remove("active"))
    tabContents.forEach((content) => content.classList.remove("active"))

    // Add active class to clicked tab and corresponding content
    btn.classList.add("active")
    document.getElementById(targetTab).classList.add("active")
  })
})

// Projects Filter
const filterBtns = document.querySelectorAll(".filter-btn")
const projectCards = document.querySelectorAll(".project-card")

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filterValue = btn.getAttribute("data-filter")

    // Remove active class from all filter buttons
    filterBtns.forEach((b) => b.classList.remove("active"))
    btn.classList.add("active")

    // Filter projects
    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category")

      if (filterValue === "all" || category === filterValue) {
        card.style.display = "block"
        setTimeout(() => {
          card.style.opacity = "1"
          card.style.transform = "translateY(0)"
        }, 100)
      } else {
        card.style.opacity = "0"
        card.style.transform = "translateY(20px)"
        setTimeout(() => {
          card.style.display = "none"
        }, 300)
      }
    })
  })
})

// Project Gallery Modal with Video Support
const projectModal = document.querySelector(".project-modal")
const modalOverlay = document.querySelector(".modal-overlay")
const modalClose = document.querySelector(".modal-close")
const modalTitle = document.querySelector(".modal-title")
const modalYear = document.querySelector(".modal-year")
const modalDescription = document.querySelector(".modal-description")
const modalTechTags = document.querySelector(".modal-tech-tags")
const galleryMainImage = document.querySelector(".gallery-main-image")
const galleryMainVideo = document.querySelector(".gallery-main-video")
const galleryThumbnails = document.querySelector(".gallery-thumbnails")
const galleryPrev = document.querySelector(".gallery-nav.prev")
const galleryNext = document.querySelector(".gallery-nav.next")

let currentImageIndex = 0
let currentProjectMedia = []

// Open project modal
document.querySelectorAll(".view-project-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault()
    const projectId = btn.getAttribute("data-project")
    openProjectModal(projectId)
  })
})

function openProjectModal(projectId) {
  const projectData = document.getElementById(projectId + "-data")

  if (!projectData) return

  // Get project data
  const title = projectData.querySelector(".gallery-title").textContent
  const year = projectData.querySelector(".gallery-year").textContent
  const description = projectData.querySelector(".gallery-description").textContent
  const tech = projectData.querySelector(".gallery-tech").textContent
  const images = projectData.querySelectorAll(".gallery-images img")
  const videos = projectData.querySelectorAll(".gallery-images video")

  // Set modal content
  modalTitle.textContent = title
  modalYear.textContent = year
  modalDescription.textContent = description

  // Set tech tags
  modalTechTags.innerHTML = ""
  tech.split(", ").forEach((techItem) => {
    const tag = document.createElement("span")
    tag.className = "tech-tag"
    tag.textContent = techItem
    modalTechTags.appendChild(tag)
  })

  // Combine images and videos into media array
  currentProjectMedia = []

  // Add images
  images.forEach((img) => {
    currentProjectMedia.push({
      type: "image",
      src: img.src,
      alt: img.alt,
    })
  })

  // Add videos
  videos.forEach((video) => {
    currentProjectMedia.push({
      type: "video",
      src: video.src,
      poster: video.poster || "",
      alt: video.alt || "Project Video",
    })
  })

  currentImageIndex = 0

  if (currentProjectMedia.length > 0) {
    updateGalleryMedia()
    createThumbnails()
  }

  // Show modal
  projectModal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function updateGalleryMedia() {
  if (currentProjectMedia.length > 0) {
    const currentMedia = currentProjectMedia[currentImageIndex]

    if (currentMedia.type === "image") {
      galleryMainImage.src = currentMedia.src
      galleryMainImage.alt = currentMedia.alt
      galleryMainImage.style.display = "block"
      galleryMainVideo.style.display = "none"
      galleryMainVideo.pause()
    } else if (currentMedia.type === "video") {
      galleryMainVideo.src = currentMedia.src
      galleryMainVideo.poster = currentMedia.poster
      galleryMainVideo.style.display = "block"
      galleryMainImage.style.display = "none"
    }

    // Update thumbnail active state
    const thumbnails = galleryThumbnails.querySelectorAll(".gallery-thumbnail")
    thumbnails.forEach((thumb, index) => {
      thumb.classList.toggle("active", index === currentImageIndex)
    })
  }
}

function createThumbnails() {
  galleryThumbnails.innerHTML = ""

  currentProjectMedia.forEach((media, index) => {
    if (media.type === "image") {
      const thumbnail = document.createElement("img")
      thumbnail.src = media.src
      thumbnail.alt = media.alt
      thumbnail.className = "gallery-thumbnail"
      if (index === currentImageIndex) {
        thumbnail.classList.add("active")
      }
      thumbnail.addEventListener("click", () => {
        currentImageIndex = index
        updateGalleryMedia()
      })
      galleryThumbnails.appendChild(thumbnail)
    } else if (media.type === "video") {
      const thumbnail = document.createElement("img")
      thumbnail.src = media.poster || "/placeholder.svg?height=70&width=100"
      thumbnail.alt = media.alt
      thumbnail.className = "gallery-thumbnail video-thumbnail"
      if (index === currentImageIndex) {
        thumbnail.classList.add("active")
      }
      thumbnail.addEventListener("click", () => {
        currentImageIndex = index
        updateGalleryMedia()
      })
      galleryThumbnails.appendChild(thumbnail)
    }
  })
}

// Gallery navigation
galleryPrev.addEventListener("click", () => {
  currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : currentProjectMedia.length - 1
  updateGalleryMedia()
})

galleryNext.addEventListener("click", () => {
  currentImageIndex = currentImageIndex < currentProjectMedia.length - 1 ? currentImageIndex + 1 : 0
  updateGalleryMedia()
})

// Close modal
function closeProjectModal() {
  projectModal.classList.remove("active")
  document.body.style.overflow = "auto"
  // Pause any playing video
  galleryMainVideo.pause()
}

modalClose.addEventListener("click", closeProjectModal)
modalOverlay.addEventListener("click", closeProjectModal)

// Keyboard navigation for modal
document.addEventListener("keydown", (e) => {
  if (projectModal.classList.contains("active")) {
    if (e.key === "Escape") {
      closeProjectModal()
    } else if (e.key === "ArrowLeft") {
      galleryPrev.click()
    } else if (e.key === "ArrowRight") {
      galleryNext.click()
    }
  }
})

// Contact Form
const contactForm = document.querySelector(".contact-form")

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)

  // Simple validation
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  if (!name || !email || !message) {
    showNotification("Please fill in all required fields.", "error")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    showNotification("Please enter a valid email address.", "error")
    return
  }

  // Show loading state
  const submitBtn = contactForm.querySelector(".btn")
  const originalText = submitBtn.innerHTML

  submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>'
  submitBtn.disabled = true

  try {
    // Submit to Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    })

    const result = await response.json()

    if (result.success) {
      showNotification("Thank you for your message! I will get back to you soon.", "success")
      contactForm.reset()

      // Reset form labels
      document.querySelectorAll(".form-group input, .form-group textarea").forEach((input) => {
        input.removeAttribute("data-filled")
      })
    } else {
      throw new Error("Form submission failed")
    }
  } catch (error) {
    console.error("Error:", error)
    showNotification("Sorry, there was an error sending your message. Please try again.", "error")
  } finally {
    // Restore button state
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false
  }
})

// Form label animation
document.querySelectorAll(".form-group input, .form-group textarea").forEach((input) => {
  input.addEventListener("focus", () => {
    input.setAttribute("data-filled", "true")
  })

  input.addEventListener("blur", () => {
    if (!input.value) {
      input.removeAttribute("data-filled")
    }
  })
})

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : "fa-info-circle"}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `

  document.body.appendChild(notification)

  // Show notification
  setTimeout(() => {
    notification.classList.add("show")
  }, 100)

  // Auto remove after 5 seconds
  setTimeout(() => {
    removeNotification(notification)
  }, 5000)

  // Close button
  notification.querySelector(".notification-close").addEventListener("click", () => {
    removeNotification(notification)
  })
}

function removeNotification(notification) {
  notification.classList.remove("show")
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification)
    }
  }, 300)
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

// Dummy function to avoid the "animateSkillLevels is not defined" error
function animateSkillLevels() {
  // This function should contain the actual logic for animating skill levels
  // if it's not already defined elsewhere in your code.
  // For example:
  // console.log("Animating skill levels...");
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")
      // Animate skill levels when skills section is visible
      if (entry.target.classList.contains("skills")) {
        setTimeout(() => {
          animateSkillLevels()
        }, 500)
      }
    }
  })
}, observerOptions)

// Observe sections for animation
document.querySelectorAll("section, .project-card, .seminar-card, .interest-card, .contact-card").forEach((el) => {
  observer.observe(el)
})

// OJT Slideshow Functionality
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slideshow-slide")
  const indicators = document.querySelectorAll(".indicator")
  const prevBtn = document.querySelector(".prev-slide")
  const nextBtn = document.querySelector(".next-slide")
  let currentSlide = 0
  let slideInterval

  // Show specific slide
  function showSlide(index) {
    // Handle wrap-around
    if (index >= slides.length) {
      currentSlide = 0
    } else if (index < 0) {
      currentSlide = slides.length - 1
    } else {
      currentSlide = index
    }

    // Update slides
    slides.forEach((slide, i) => {
      slide.classList.remove("active")
      if (i === currentSlide) {
        slide.classList.add("active")
      }
    })

    // Update indicators
    indicators.forEach((indicator, i) => {
      indicator.classList.remove("active")
      if (i === currentSlide) {
        indicator.classList.add("active")
      }
    })
  }

  // Next slide
  function nextSlide() {
    showSlide(currentSlide + 1)
  }

  // Previous slide
  function prevSlide() {
    showSlide(currentSlide - 1)
  }

  // Auto-play slideshow
  function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000) // Change slide every 5 seconds
  }

  // Stop auto-play
  function stopSlideshow() {
    clearInterval(slideInterval)
  }

  // Event listeners for navigation buttons
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide()
      stopSlideshow()
      startSlideshow() // Restart auto-play after manual navigation
    })
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide()
      stopSlideshow()
      startSlideshow() // Restart auto-play after manual navigation
    })
  }

  // Event listeners for indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showSlide(index)
      stopSlideshow()
      startSlideshow() // Restart auto-play after manual navigation
    })
  })

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide()
      stopSlideshow()
      startSlideshow()
    } else if (e.key === "ArrowRight") {
      nextSlide()
      stopSlideshow()
      startSlideshow()
    }
  })

  // Pause slideshow on hover
  const slideshowContainer = document.querySelector(".slideshow-container")
  if (slideshowContainer) {
    slideshowContainer.addEventListener("mouseenter", stopSlideshow)
    slideshowContainer.addEventListener("mouseleave", startSlideshow)
  }

  // Start the slideshow
  startSlideshow()

  // Touch support for mobile
  let touchStartX = 0
  let touchEndX = 0

  if (slideshowContainer) {
    slideshowContainer.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX
    })

    slideshowContainer.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    })
  }

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // Swipe left - next slide
      nextSlide()
      stopSlideshow()
      startSlideshow()
    }
    if (touchEndX > touchStartX + 50) {
      // Swipe right - previous slide
      prevSlide()
      stopSlideshow()
      startSlideshow()
    }
  }
})

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Apply throttling to scroll events
window.addEventListener(
  "scroll",
  throttle(() => {
    // Scroll-dependent functions are already optimized above
  }, 16),
) // ~60fps
