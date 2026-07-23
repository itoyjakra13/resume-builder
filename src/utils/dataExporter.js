/**
 * Serializes application state and triggers a browser file download of a JSON file.
 */
export function exportToJson(resumeData, metadata, onSuccess, onError) {
  try {
    const dataStr = JSON.stringify({
      version: '1.0',
      exportedAt: new Date().toISOString(),
      resumeData,
      metadata
    }, null, 2);
    
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    const rawName = resumeData.personalInfo?.fullName?.trim() || 'Resume';
    const fileName = `${rawName.toLowerCase().replace(/\s+/g, '_')}_data.json`;
    
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (onSuccess) {
      onSuccess(`Exported ${fileName} successfully!`);
    }
  } catch (error) {
    console.error('Failed to export data:', error);
    if (onError) {
      onError('Error generating export file. Please check your data.');
    }
  }
}

/**
 * Reads a JSON file upload and verifies content structure integrity before calling callback.
 */
export function importFromJson(file, onSuccess, onFailure) {
  if (!file) {
    if (onFailure) onFailure('No file selected for import.');
    return;
  }

  if (!file.name.endsWith('.json')) {
    if (onFailure) onFailure('Invalid file type. Please upload a .json file.');
    return;
  }

  const reader = new FileReader();
  
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      
      // Verification Schema Checks
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid file format. Import must be a JSON object.');
      }
      
      if (!data.resumeData || !data.resumeData.personalInfo) {
        throw new Error('Missing core resume data details inside the file.');
      }

      onSuccess(data.resumeData, data.metadata || {});
    } catch (error) {
      console.error('Import failed:', error);
      onFailure(error.message || 'Failed to parse JSON file. File may be corrupted or incorrectly formatted.');
    }
  };

  reader.onerror = () => {
    onFailure('Failed to read the file from your disk.');
  };
  
  reader.readAsText(file);
}

