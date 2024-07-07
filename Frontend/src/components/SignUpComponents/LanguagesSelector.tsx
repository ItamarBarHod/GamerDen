import { useState, useEffect } from "react";
import { TextField, Chip, Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { languages as LanguageListing } from "../../languages.json";

type LanguageSelectorProps = {
  languages: string[];
  onChange: (languages: string[]) => void;
  languageError?: string;
};

const LanguageSelector = ({
  languages,
  onChange,
  languageError = "",
}: LanguageSelectorProps) => {
  const [allLanguages, setAllLanguages] = useState<string[]>([]);

  useEffect(() => {
    const languageList: string[] = LanguageListing;
    setAllLanguages(languageList.filter((lang) => !languages.includes(lang)));
  }, [languages]);

  const handleAddLanguage = (language: string) => {
    if (allLanguages.includes(language)) {
      onChange([...languages, language]);
      setAllLanguages(allLanguages.filter((lang) => lang !== language));
    }
  };

  const handleRemoveLanguage = (language: string) => {
    onChange(languages.filter((lang) => lang !== language));
    setAllLanguages([...allLanguages, language]);
  };

  return (
    <Box className="mt-2">
      <Autocomplete
        options={allLanguages}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Language"
            error={Boolean(languageError)}
            helperText={languageError}
          />
        )}
        onChange={(_event, value) => value && handleAddLanguage(value)}
      />
      <Box marginTop={1}>
        {languages.map((language) => (
          <Chip
            key={language}
            label={language}
            onDelete={() => handleRemoveLanguage(language)}
            variant="filled"
            color="primary"
            style={{ margin: '2px' }}
          />
        ))}
      </Box>
    </Box >
  );
};

export default LanguageSelector;
