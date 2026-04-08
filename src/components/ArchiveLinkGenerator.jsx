import { useState, useEffect } from "react";

const ArchiveLinkGenerator = ({ selectedTags, bandName, venueName }) => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [generatedLink, setGeneratedLink] = useState("");

  useEffect(() => {
    const generateLink = () => {
      const baseUrl = "https://archive.org/upload";
      const params = new URLSearchParams();

      // params.append("mediatype", "movies");
      params.append('collection', 'opensource_movies');

      if (bandName) {
        const sanitizedBand = bandName.replace(/[^a-zA-Z0-9-_]/g, '');
        params.append("identifier", `${date}-${sanitizedBand}`);
        params.append("title", `${bandName} @ ${venueName} on ${date}`);
        params.append("description", `${bandName} @ ${venueName} on ${date}`);
      } else {
        params.append("title", `Live recording @ ${venueName} on ${date}`);
        params.append("description", `Live recording @ ${venueName} on ${date}`);
      }

      if (selectedTags && selectedTags.length > 0) {
        params.append("subject", selectedTags.join(";"));
      }

      params.append("date", date);
      params.append("language", "eng");
      params.append("venue", venueName)

      setGeneratedLink(`${baseUrl}?${params.toString()}`);
    };

    generateLink();
  }, [date, bandName, selectedTags]);

  return (
    <div className="output-section">
      <h3>Archive.org Link Generator</h3>
      <div>
        <label htmlFor="date-input">Date:</label>
        <input
          id="date-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      {generatedLink && (
        <div className="generated-link">
          <p>Generated Link:</p>
          <a href={generatedLink} target="_blank" rel="noopener noreferrer">
            {generatedLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default ArchiveLinkGenerator;
