/**
 * Serializes application state and triggers a browser file download of a JSON file.
 */
export function exportToJson(resumeData, metadata) {
  try {
    const dataStr = JSON.stringify({
      version: '1.0',
      resumeData,
      metadata
    }, null, 2);
    
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    const rawName = resumeData.personalInfo?.fullName?.trim() || 'resume';
    const fileName = `${rawName.toLowerCase().replace(/\s+/g, '_')}_data.json`;
    
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to export data:', error);
    alert('Error exporting data. Please try again.');
  }
}

/**
 * Reads a JSON file upload and verifies content structure integrity before calling callback.
 */
export function importFromJson(file, onSucess, onFailure) {
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

      onSucess(data.resumeData, data.metadata || {});
    } catch (error) {
      console.error('Import failed:', error);
      onFailure(error.message || 'Failed to parse JSON file.');
    }
  };
  
  reader.readAsText(file);
}
