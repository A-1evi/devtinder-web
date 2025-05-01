import React, { useState } from "react";
/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";

import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Plus, Code, Image, Link as LinkIcon, Tag } from "lucide-react";

const NewPostModal = ({ open, onOpenChange }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);
  const availableTags = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "Node.js",
    "React",
    "CSS",
    "HTML",
    "Design Patterns",
    "Algorithms",
    "Data Structures",
  ];

  const handleSubmit = () => {
    console.log("Post submitted:", {
      title,
      content,
      codeSnippet,
      selectedTags,
    });
    setTitle("");
    setContent("");
    setCodeSnippet("");
    setShowCodeEditor(false);
    setSelectedTags([]);
    onOpenChange(false);
  };
  const handleAddTag = () => {
    if (currentTag && !selectedTags.includes(currentTag)) {
      setSelectedTags([...selectedTags, currentTag]);
      setCurrentTag("");
    }
  };
  const handleRemoveTag = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-black text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">
            Create New Post
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="What's your post about?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-900 border-gray-800"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Share your thoughts, questions, or insights..."
              className="min-h-[120px] bg-gray-900 border-gray-800"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {showCodeEditor && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="code">Code Snippet</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCodeEditor(false)}
                  className="h-8 text-muted-foreground hover:text-foreground"
                >
                  Remove Code
                </Button>
              </div>
              <Textarea
                id="code"
                placeholder="// Paste your code here"
                className="min-h-[120px] font-mono text-sm bg-gray-950 text-gray-100 border-gray-800"
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2 flex-wrap mb-2">
              {selectedTags.map((tag) => (
                <div
                  key={tag}
                  className="bg-blue-950 text-blue-400 px-2 py-1 rounded-full text-xs flex items-center"
                >
                  {tag}
                  <button
                    className="ml-1 text-blue-400 hover:text-white"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 bg-black">
              <Select value={currentTag} onValueChange={setCurrentTag}>
                <SelectTrigger className="w-full bg-gray-900 border-gray-800">
                  <SelectValue placeholder="Select a tag" />
                </SelectTrigger>
                <SelectContent className="bg-black">
                  {availableTags
                    .filter((tag) => !selectedTags.includes(tag))
                    .map((tag) => (
                      <SelectItem
                        key={tag}
                        value={tag}
                        className="hover:bg-gray-900 focus:bg-gray-900 text-white cursor-pointer"
                      >
                        {tag}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                className="shrink-0 bg-transparent px-3 "
                onClick={handleAddTag}
                disabled={!currentTag}
              >
                Add
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-muted-foreground">
            Add to your post:
          </span>
          <div className="flex gap-1">
            {!showCodeEditor && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8 text-blue-500"
                onClick={() => setShowCodeEditor(true)}
              >
                <Code className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 text-green-500"
            >
              <Image className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 text-purple-500"
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button className="py-2 px-2 bg-transparent" variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 font-medium text-white"
          >
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewPostModal;
