import { Post } from "../../../models/post";
import { useGetFeaturedListsQuery } from "../../../redux/apis/post.api";
import { formatDateShort } from "../../../utils/time-formate";
import LoadingAnimation from "../../loading/loading.component";
import SSProfile from "../../ui-component/ss-profile/ss-profile";
import { useNavigate } from "react-router-dom";

import {
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

const FeatureComponent = () => {
  const { data, isLoading } =
    useGetFeaturedListsQuery(undefined);

  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="mb-12 text-slate-100">
      <h2 className="text-2xl font-bold text-slate-100 mb-6">
        Featured Posts
      </h2>

      <div className="grid gap-8 sm:grid-cols-2">
        {(data?.posts?.length ?? 0) > 0 ? (
          data?.posts?.map((post: Post) => {
            const postUrl = `${window.location.origin}/post/${post._id}`;

            return (
              <div
                key={post._id}
                onClick={() =>
                  navigate(`/post/${post._id}`)
                }
                className="h-full bg-blue-500/10 rounded-lg shadow-sm overflow-hidden border border-slate-700/40 cursor-pointer hover:bg-blue-500/20 transition-colors duration-200"
              >
                <img
                  className="h-48 w-full object-cover"
                  src={post.imageURL}
                  alt={post.title || "Featured Post"}
                />

                <div className="p-6">
                  {/* Author */}
                  <div className="flex items-center mb-3">
                    <SSProfile
                      name={
                        post.author?.name ||
                        "Unknown User"
                      }
                      size="h-8 w-8"
                    />

                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-400">
                        {post.author?.name ||
                          "Unknown User"}
                      </p>

                      <p className="text-xs text-gray-500">
                        {formatDateShort(
                          post.createdAt
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">
                    {post.title}
                  </h3>

                  {/* Content Preview */}
                  <p className="text-gray-400 mb-4">
                    {(post.content || "").slice(
                      0,
                      100
                    )}
                    ...
                  </p>

                  {/* Bottom Section */}
                  <div className="flex items-center justify-between border-t border-slate-700 pt-4 text-sm text-gray-500">
                    {/* Likes & Comments */}
                    <div className="flex items-center">
                      <span className="flex items-center mr-4">
                        <i className="far fa-heart mr-1"></i>
                        {post.likesCount ?? 0}
                      </span>

                      <span className="flex items-center">
                        <i className="far fa-comment mr-1"></i>
                        {post.commentsCount ?? 0}
                      </span>
                    </div>

                    {/* Share Buttons */}
                    <div className="flex items-center gap-4 text-gray-400">
                      {/* Twitter/X */}
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                          postUrl
                        )}&text=${encodeURIComponent(
                          post.title || ""
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Share on Twitter"
                        className="hover:text-sky-400 transition-colors duration-200"
                        onClick={(e) =>
                          e.stopPropagation()
                        }
                      >
                        <FaTwitter size={16} />
                      </a>

                      {/* LinkedIn */}
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                          postUrl
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Share on LinkedIn"
                        className="hover:text-blue-500 transition-colors duration-200"
                        onClick={(e) =>
                          e.stopPropagation()
                        }
                      >
                        <FaLinkedin size={16} />
                      </a>

                      {/* Email */}
                      <a
                        href={`mailto:?subject=${encodeURIComponent(
                          post.title || ""
                        )}&body=${encodeURIComponent(
                          `${(
                            post.content || ""
                          ).slice(
                            0,
                            120
                          )}...\n\nRead more: ${postUrl}`
                        )}`}
                        title="Share via Email"
                        className="hover:text-red-400 transition-colors duration-200"
                        onClick={(e) =>
                          e.stopPropagation()
                        }
                      >
                        <FaEnvelope size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-lg border border-slate-700/70 bg-slate-900/40 px-4 py-5 text-slate-300">
            Feature Post is not available!
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureComponent;