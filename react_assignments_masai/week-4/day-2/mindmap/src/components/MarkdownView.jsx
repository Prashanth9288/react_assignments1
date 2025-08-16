import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownView({ md }) {
  return <div className="prose"><ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown></div>;
}
