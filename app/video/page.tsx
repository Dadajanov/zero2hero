export default function VideoPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-foreground mb-8">О платформе ZERO 2 HERO</h1>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <video controls autoPlay className="w-full aspect-video" poster="/professional-career-platform-video-thumbnail.jpg">
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">О нашей платформе</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            ZERO 2 HERO - это профессиональная платформа, которая помогает студентам и выпускникам найти оплачиваемую
            стажировку и начать карьеру в ведущих компаниях.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Мы предоставляем доступ к эксклюзивным вакансиям, бесплатным курсам по развитию карьеры и персональным
            консультациям от экспертов индустрии.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Присоединяйтесь к тысячам успешных профессионалов, которые начали свою карьеру с ZERO 2 HERO!
          </p>
        </div>
      </main>
    </div>
  )
}
