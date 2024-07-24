import { TextField } from "@vaadin/react-components";
import { useState } from "react";
import { ChatAiService } from "Frontend/generated/endpoints";
import Markdown from "react-markdown";

export default function Chat() {
    const [question, setQuestion] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const [file, setFile] = useState<File>(null);

    async function send() {
        ChatAiService.ragChat(question).then(resp => {
            setResponse(resp);
        });
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    }

    return (
        <div className="chat-container d-flex flex-column h-100">
            <div className="flex-grow-1 p-3 overflow-auto">
                <Markdown>{response}</Markdown>
            </div>
            <div className="chat-input-container p-3 d-flex align-items-center">
                <textarea className="form-control me-2" value={question} onChange={(e) => setQuestion(e.target.value)}></textarea>
                <button className="btn btn-primary me-2" onClick={send}>
                    <i className="bi bi-send"></i>
                </button>
                <button className="btn btn-secondary me-2" onClick={() => document.getElementById('file-input').click()}>
                    <i className="bi bi-paperclip"></i>
                </button>
                <input
                    type="file"
                    id="file-input"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
}
