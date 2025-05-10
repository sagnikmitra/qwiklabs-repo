import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import { AlertCircle, Check, Download, Loader, Upload } from "lucide-react";
import { useRef, useState } from "react";
import Confetti from "react-confetti";
import { useUserData } from "../context/UserDataContext";

const BadgeGeneratorPage = () => {
  const [email, setEmail] = useState("");
  const [milestoneLevel, setMilestoneLevel] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [generatingBadge, setGeneratingBadge] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
  const [error, setError] = useState("");

  const { getUserByEmail, getUserMilestoneLevel, isLoading } = useUserData();
  const badgeRef = useRef<HTMLDivElement>(null);

  const getBadgeOverlay = () => {
    switch (milestoneLevel) {
      case 1:
        return "bg-primary-500 bg-opacity-40";
      case 2:
        return "bg-warning-500 bg-opacity-40";
      case 3:
        return "bg-accent-600 bg-opacity-40";
      case 4:
        return "bg-success-500 bg-opacity-40";
      default:
        return "bg-gray-500 bg-opacity-40";
    }
  };

  const getBadgeBorder = () => {
    switch (milestoneLevel) {
      case 1:
        return "border-primary-500";
      case 2:
        return "border-warning-500";
      case 3:
        return "border-accent-600";
      case 4:
        return "border-success-500";
      default:
        return "border-gray-400";
    }
  };

  const getMilestoneText = () => {
    switch (milestoneLevel) {
      case 1:
        return "First Milestone: On a Streak! 🔥";
      case 2:
        return "Second Milestone: On Fire! 💥";
      case 3:
        return "Third Milestone: Unstoppable! ✨";
      case 4:
        return "Ultimate Milestone: True Legend! 😍";
      default:
        return "No milestone achieved";
    }
  };

  const handleCheckEmail = () => {
    if (!email.trim()) {
      setError("Please enter an email");
      return;
    }

    const user = getUserByEmail(email);
    if (user) {
      const level = getUserMilestoneLevel(
        user.questsCompleted,
        user.skillBadgesCompleted
      );
      setMilestoneLevel(level);
      setError("");
    } else {
      setError("User not found");
      setMilestoneLevel(0);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };

      reader.readAsDataURL(file);

      handleGenerateBadge();
    }
  };

  const handleGenerateBadge = async () => {
    if (milestoneLevel === 0) {
      setError(
        "You need to achieve at least one milestone to generate a badge"
      );
      return;
    }

    setGeneratingBadge(true);
    setError("");

    // Delay to ensure the badge is rendered
    setTimeout(() => {
      if (badgeRef.current) {
        toPng(badgeRef.current)
          .then((dataUrl) => {
            setPreviewImage(dataUrl);
            setDownloadReady(true);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
          })
          .catch((err) => {
            console.error(err);
            setError("Failed to generate badge");
          })
          .finally(() => {
            setGeneratingBadge(false);
          });
      }
    }, 500);
  };

  const handleDownload = () => {
    if (!badgeRef.current) return;

    setGeneratingBadge(true);

    toPng(document.getElementById("badge-preview"), { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `qwiklabs-badge-milestone-${milestoneLevel}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTestDemo = () => {
    setEmail("test");
    setMilestoneLevel(3);
    setError("");
  };

  return (
    <div>
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="heading-2 mb-6">Generate Your Profile Badge</h1>

        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4">Badge Generator</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Enter Your Qwiklabs Email ID
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="input rounded-r-none"
                  />
                  <button
                    onClick={handleCheckEmail}
                    disabled={isLoading}
                    className="btn-primary rounded-l-none flex items-center justify-center"
                  >
                    {isLoading ? (
                      <Loader className="animate-spin" size={18} />
                    ) : (
                      <Check size={18} />
                    )}
                  </button>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-500">Or use demo data:</p>
                  <button
                    onClick={handleTestDemo}
                    className="text-sm text-primary-600 hover:text-primary-800"
                  >
                    Use Test Data
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Your Image
                </label>
                <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-primary-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    {image ? (
                      <div className="flex items-center">
                        <img
                          src={image}
                          alt="Preview"
                          className="w-16 h-16 object-cover rounded-full"
                        />
                        <span className="ml-2 text-primary-600">
                          Change Image
                        </span>
                      </div>
                    ) : (
                      <>
                        <Upload size={36} className="text-gray-400 mb-2" />
                        <span className="text-gray-600">
                          Click to upload an image
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          Square images work best
                        </span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-3 bg-error-50 text-error-800 rounded-lg flex items-start">
                  <AlertCircle
                    size={18}
                    className="mr-2 mt-0.5 flex-shrink-0"
                  />
                  <p>{error}</p>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-medium mb-2">Current Milestone Level</h3>
                <div
                  className={`py-2 px-4 rounded-lg ${
                    milestoneLevel > 0
                      ? "bg-success-50 text-success-800"
                      : "bg-gray-50 text-gray-600"
                  }`}
                >
                  <p className="font-medium">
                    {milestoneLevel > 0
                      ? getMilestoneText()
                      : "No milestone detected"}
                  </p>
                </div>
              </div>

              {/* <button
                onClick={handleGenerateBadge}
                disabled={!image || milestoneLevel === 0 || generatingBadge}
                className={`btn w-full flex items-center justify-center ${
                  !image || milestoneLevel === 0
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "btn-primary"
                }`}
              >
                {generatingBadge ? (
                  <>
                    <Loader className="animate-spin mr-2" size={18} />
                    Generating...
                  </>
                ) : (
                  <>
                    <Camera className="mr-2" size={18} />
                    Generate Badge
                  </>
                )}
              </button> */}
            </div>

            <div>
              <h3 className="font-medium mb-4">Badge Preview</h3>
              <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <div className="">
                    <div
                      ref={badgeRef}
                      id="badge-preview"
                      className="relative W-[500px] h-[500px] "
                    >
                      {image && (
                        <>
                          <img
                            src={image}
                            alt="User"
                            className="w-full h-full object-cover"
                          />

                          <img
                            src={
                              milestoneLevel === 1
                                ? "/first.png"
                                : milestoneLevel === 2
                                ? "/second.png"
                                : milestoneLevel === 3
                                ? "/third.png"
                                : milestoneLevel === 4
                                ? "/ultimate.png"
                                : "/nomile.png"
                            }
                            alt="Badge Overlay"
                            className="absolute inset-0 w-full h-full"
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleDownload}
                  className="btn-success w-full flex items-center justify-center"
                >
                  <Download className="mr-2" size={18} />
                  Download Badge
                </button>
              </div>
            </div>
          </div>

          {/* Hidden badge generation div */}
          <div className="hidden">
            <div ref={badgeRef} className="relative w-[500px] h-[500px]">
              {image && (
                <>
                  <img
                    src={image}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 ${getBadgeOverlay()}`}
                  ></div>
                  <div
                    className={`absolute inset-0 border-8 ${getBadgeBorder()}`}
                  ></div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
                    <p className="text-lg font-bold text-center">
                      #GoogleCloudReady
                    </p>
                    <p className="text-center">{getMilestoneText()}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-white ${
                        milestoneLevel === 1
                          ? "bg-primary-600"
                          : milestoneLevel === 2
                          ? "bg-warning-600"
                          : milestoneLevel === 3
                          ? "bg-accent-700"
                          : milestoneLevel === 4
                          ? "bg-success-600"
                          : "bg-gray-600"
                      }`}
                    >
                      {milestoneLevel}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Instructions</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">
                How to Use the Badge Generator
              </h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  Enter your Qwiklabs email ID to verify your milestone level
                </li>
                <li>Upload a square image for the best results</li>
                <li>
                  Click on "Generate Badge" to create your personalized badge
                </li>
                <li>Download the badge and share it on social media</li>
              </ol>
            </div>
            <p className="text-sm text-gray-600">
              Share your badge on{" "}
              <a
                href="https://bit.ly/crf-discord"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-800"
              >
                Discord
              </a>{" "}
              and on your social media handles by tagging us as your Facilitator
              and Google Cloud India, also use the{" "}
              <span className="font-medium">#GoogleCloudReady</span> tag. Google
              Cloud team closely monitor this tag.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BadgeGeneratorPage;
